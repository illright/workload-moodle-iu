<?php

/** Credit: https://stackoverflow.com/a/53121360/5726823 */
function path_join(...$parts) {
    return preg_replace('#' . DIRECTORY_SEPARATOR . '+#', DIRECTORY_SEPARATOR, implode(DIRECTORY_SEPARATOR, array_filter($parts)));
}

// For objects $DB, $USER, $COURSE
require_once(path_join(__DIR__, '../../config.php'));


function get_upcoming_deadlines_from_course($course_id) {
    global $DB;

    return $DB->get_records_sql(
        <<<EOS
            SELECT
                {assign}.id,
                {assign}.name,
                {assign}.duedate
            FROM
                {assign}
            WHERE
                {assign}.course = :course_id
                AND {assign}.duedate > unix_timestamp(now());
        EOS,
        ['course_id' => $course_id]
    );
}

function get_upcoming_deadlines_for_student($student_id) {
    global $DB;

    return $DB->get_records_sql(
        <<<EOS
            SELECT
                {assign}.id,
                {assign}.name,
                {assign}.duedate
                {course}.id AS course_id
                {course}.fullname AS course_name
            FROM
                {assign}
                INNER JOIN {course}
                    ON {assign}.course = {course}.id
            WHERE
                {assign}.course IN (
                    SELECT
                        {enrol}.courseid
                    FROM
                        {enrol}
                        INNER JOIN {user_enrolments}
                            ON {enrol}.id = {user_enrolments}.enrolid
                    WHERE
                        {user_enrolments}.userid = :student_id
                )
                AND {assign}.duedate > unix_timestamp(now());
        EOS,
        ['student_id' => $student_id]
    );
}

function get_ungraded_submissions_from_course($course_id, $student_id) {
    global $DB;

    return $DB->get_records_sql(
        <<<EOS
            SELECT
                {assign}.id,
                {assign}.name,
                {assign}.gradingduedate,
                SUM({assign_grades}.grade IS NOT NULL AND {assign_grades}.grade >= 0) AS submissions_graded,
                COUNT(*) AS submissions_total
            FROM
                {assign_submission}
                INNER JOIN {assign}
                    ON {assign_submission}.assignment = {assign}.id
                LEFT OUTER JOIN {assign_grades}
                    ON {assign_submission}.assignment = {assign_grades}.assignment
                    AND {assign_submission}.userid = {assign_grades}.userid
                    AND {assign_submission}.attemptnumber = {assign_grades}.attemptnumber
            WHERE
                {assign}.course = :course_id
                AND {assign_submission}.status = 'submitted'
            GROUP BY
                {assign}.id,
                {assign}.name
            HAVING
                SUM(
                    {assign_submission}.userid = :student_id
                    AND ({assign_grades}.grade IS NULL OR {assign_grades}.grade < 0)
                ) > 0
        EOS,
        ['course_id' => $course_id, 'student_id' => $student_id]
    );
}

function is_student_dashboard_page() {
    return strpos(getcwd(), 'my') !== false;
}

function embed_js($script_path, $target_div_id = 'workload_target') {
    $script = file_get_contents(path_join(__DIR__, $script_path));
    $content = new stdClass;
    $content->text =
        html_writer::empty_tag('div', array('id' => $target_div_id))
        . html_writer::tag('script', $script);
    return $content;
}

class block_workload extends block_base {
    public function init() {
        $this->title = get_string('workload', 'block_workload');
    }

    public function get_content() {
        global $USER;
        global $COURSE;

        // Commented out in hopes of faster reloading in development
        // if ($this->content !== null) {
        //   return $this->content;
        // }

        $this->content = new stdClass;
        if ($COURSE->id !== 1) {
            $db_data = json_encode(
                get_upcoming_deadlines_from_course($COURSE->id),
                JSON_PRETTY_PRINT
            ) . PHP_EOL . PHP_EOL . json_encode(
                get_ungraded_submissions_from_course($COURSE->id, $USER->id),
                JSON_PRETTY_PRINT
            );
        } else {
            $db_data = json_encode(
                get_upcoming_deadlines_for_student($USER->id),
                JSON_PRETTY_PRINT
            );
        }

        $this->content->text = html_writer::tag('pre', $db_data);

        return $this->content;
    }

    public function html_attributes() {
        $attributes = parent::html_attributes();
        return $attributes;
    }
}

<?php

/**
 * Fetches all assignments of a given course whose due date is in the future.
 *
 * Required in the course view for both students and instructors.
 */
function get_upcoming_deadlines_from_course($DB, $course_id) {
    return array_values($DB->get_records_sql(
        <<<EOS
            SELECT
                {assign}.id as assignmentID,
                {assign}.name as assignmentName,
                {assign}.duedate as submissionDeadline
            FROM
                {assign}
            WHERE
                {assign}.course = :course_id
                AND {assign}.duedate > unix_timestamp(now());
        EOS,
        ['course_id' => $course_id]
    ));
}

/**
 * Fetches all assignments of a given student whose due date is in the future.
 *
 * Required in the dashboard view for students.
 */
function get_upcoming_deadlines_for_student($DB, $student_id) {
    return array_values($DB->get_records_sql(
        <<<EOS
            SELECT
                {assign}.id as assignmentID,
                {assign}.name as assignmentName,
                {assign}.duedate as submissionDeadline,
                {course}.fullname AS courseName
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
    ));
}

/**
 * Fetches all assignments of a given course that have ungraded submissions from a given student.
 *
 * Required in the course view for both students and instructors.
 */
function get_ungraded_submissions_from_course($DB, $course_id, $student_id) {
    return array_values($DB->get_records_sql(
        <<<EOS
            SELECT
                {assign}.id as assignmentID,
                {assign}.name as assignmentName,
                {assign}.gradingduedate as gradingDeadline,
                SUM({assign_grades}.grade IS NOT NULL AND {assign_grades}.grade >= 0) AS gradedSubmissions,
                COUNT(*) AS submissions
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
    ));
}

?>

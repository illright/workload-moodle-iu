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
                {course_modules}.id as assignmentID,
                {assign}.name as assignmentName,
                {assign}.duedate as submissionDeadline
            FROM
                {assign}
                INNER JOIN {course_modules}
                    ON {assign}.id = {course_modules}.instance
                INNER JOIN {modules}
                    ON {course_modules}.module = {modules}.id
            WHERE
                {assign}.course = :course_id
                AND {assign}.duedate > unix_timestamp(now())
                AND {modules}.name = 'assign'
            ;
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
                {course_modules}.id as assignmentID,
                {assign}.name as assignmentName,
                {assign}.duedate as submissionDeadline,
                {course}.fullname AS courseName
            FROM
                {assign}
                INNER JOIN {course}
                    ON {assign}.course = {course}.id
                INNER JOIN {course_modules}
                    ON {assign}.id = {course_modules}.instance
                INNER JOIN {modules}
                    ON {course_modules}.module = {modules}.id
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
                AND {assign}.duedate > unix_timestamp(now())
                AND {modules}.name = 'assign'
            ;
        EOS,
        ['student_id' => $student_id]
    ));
}

/**
 * Fetches all assignments of a given course that have ungraded submissions from a given student.
 *
 * Required in the course view for students.
 */
function get_ungraded_submissions_from_course($DB, $course_id, $student_id) {
    return array_values($DB->get_records_sql(
        <<<EOS
            SELECT
                {course_modules}.id as assignmentID,
                {assign}.name as assignmentName,
                {assign}.gradingduedate as gradingDeadline,
                SUM({assign_grades}.grade IS NOT NULL AND {assign_grades}.grade >= 0) AS gradedSubmissions,
                COUNT(*) AS submissions,
                (
                    SELECT
                        COUNT(*)
                    FROM
                        {user_enrolments}
                    INNER JOIN {enrol}
                        ON {user_enrolments}.enrolid = {enrol}.id
                    WHERE
                        {enrol}.courseid = {course_modules}.course
                ) AS totalStudents
            FROM
                {assign_submission}
                INNER JOIN {assign}
                    ON {assign_submission}.assignment = {assign}.id
                INNER JOIN {course_modules}
                    ON {assign}.id = {course_modules}.instance
                INNER JOIN {modules}
                    ON {course_modules}.module = {modules}.id
                LEFT OUTER JOIN {assign_grades}
                    ON {assign_submission}.assignment = {assign_grades}.assignment
                    AND {assign_submission}.userid = {assign_grades}.userid
                    AND {assign_submission}.attemptnumber = {assign_grades}.attemptnumber
            WHERE
                {assign}.course = :course_id
                AND {assign_submission}.status = 'submitted'
                AND {modules}.name = 'assign'
            GROUP BY
                {course_modules}.id,
                {course_modules}.course,
                {assign}.name,
                {assign}.gradingduedate
            HAVING
                SUM(
                    {assign_submission}.userid = :student_id
                    AND ({assign_grades}.grade IS NULL OR {assign_grades}.grade < 0)
                ) > 0
            ;
        EOS,
        ['course_id' => $course_id, 'student_id' => $student_id]
    ));
}

/**
 * Fetches all assignments of a given course that have ungraded submissions from all students.
 *
 * Required in the course view for instructors.
 */
function get_all_ungraded_submissions_from_course($DB, $course_id) {
    return array_values($DB->get_records_sql(
        <<<EOS
            SELECT
                {course_modules}.id as assignmentID,
                {assign}.name as assignmentName,
                {assign}.gradingduedate as gradingDeadline,
                SUM({assign_grades}.grade IS NOT NULL AND {assign_grades}.grade >= 0) AS gradedSubmissions,
                COUNT(*) AS submissions,
                (
                    SELECT
                        COUNT(*)
                    FROM
                        {user_enrolments}
                    INNER JOIN {enrol}
                        ON {user_enrolments}.enrolid = {enrol}.id
                    WHERE
                        {enrol}.courseid = {course_modules}.course
                ) AS totalStudents
            FROM
                {assign_submission}
                INNER JOIN {assign}
                    ON {assign_submission}.assignment = {assign}.id
                INNER JOIN {course_modules}
                    ON {assign}.id = {course_modules}.instance
                INNER JOIN {modules}
                    ON {course_modules}.module = {modules}.id
                LEFT OUTER JOIN {assign_grades}
                    ON {assign_submission}.assignment = {assign_grades}.assignment
                    AND {assign_submission}.userid = {assign_grades}.userid
                    AND {assign_submission}.attemptnumber = {assign_grades}.attemptnumber
            WHERE
                {assign}.course = :course_id
                AND {assign_submission}.status = 'submitted'
                AND {modules}.name = 'assign'
            GROUP BY
                {course_modules}.id,
                {course_modules}.course,
                {assign}.name,
                {assign}.gradingduedate
            HAVING
                SUM({assign_grades}.grade IS NULL OR {assign_grades}.grade < 0) > 0
            ;
        EOS,
        ['course_id' => $course_id, 'student_id' => $student_id]
    ));
}

/**
 * Fetches a list of assignments along with their start and end timestamps.
 *
 * Only returns the assignments from courses that are taken by students
 * who also take the course with the specified ID.
 */
function get_sibling_assignments($DB, $course_id) {
    return array_values($DB->get_records_sql(
        <<<EOS
            SELECT
                {assign}.name,
                {assign}.course AS courseID,
                {assign}.allowsubmissionsfromdate AS start,
                {assign}.duedate AS end
            FROM
                {assign}
            WHERE
                {assign}.course IN (
                    SELECT
                        {enrol}.courseid
                    FROM
                        (
                            SELECT
                                {user_enrolments}.userid
                            FROM
                                {user_enrolments}
                                INNER JOIN {enrol}
                                    ON {enrol}.id = {user_enrolments}.enrolid
                            WHERE
                                {enrol}.courseid = :this_course_id
                        ) enrolled_students
                        LEFT OUTER JOIN {user_enrolments}
                            ON enrolled_students.userid = {user_enrolments}.userid
                        INNER JOIN {enrol}
                            ON {user_enrolments}.enrolid = {enrol}.id
                )
            ;
        EOS,
        ['this_course_id' => $course_id]
    ));
}

/**
 * Fetches a mapping of course IDs to IDs of enrolled students.
 *
 * Only returns courses that have at least one student who also takes
 * the course with the specified ID.
 *
 * Required in the course view for instructors.
 */
function map_course_to_students($DB, $course_id) {
    return array_values($DB->get_records_sql(
        <<<EOS
            SELECT
                {course}.id,
                GROUP_CONCAT(
                    {user_enrolments}.userid
                ) as students
            FROM
                {course}
                LEFT OUTER JOIN {enrol}
                    ON {enrol}.courseid = {course}.id
                INNER JOIN {user_enrolments}
                    ON {user_enrolments}.enrolid = {enrol}.id
            WHERE
                {user_enrolments}.userid IN (
                    SELECT
                        {user_enrolments}.userid
                    FROM
                        {user_enrolments}
                        INNER JOIN {enrol}
                            ON {enrol}.id = {user_enrolments}.enrolid
                    WHERE
                        {enrol}.courseid = :this_course_id
                )
            GROUP BY
                {course}.id
            ;
        EOS,
        ['this_course_id' => $course_id]
    ));
}

function get_course_dates($DB, $course_id) {
    return $DB->get_record_sql(
        <<<EOS
            SELECT
                {course}.startdate,
                {course}.enddate
            FROM
                {course}
            WHERE
                {course}.id = :this_course_id
            ;
        EOS,
        ['this_course_id' => $course_id]
    );
}

function is_student_of_any_course($DB, $user_id) {
    return $DB->get_record_sql(
        <<<EOS
            SELECT
                'student' IN (
                    SELECT
                        {role}.shortname
                    FROM
                        {role}
                        INNER JOIN {role_assignments}
                            ON {role_assignments}.roleid = {role}.id
                    WHERE
                        {role_assignments}.userid = :user_id
                ) AS is_student
            ;
        EOS,
        ['user_id' => $user_id]
    )->is_student;
}

function is_student_of_this_course($DB, $user_id, $course_id) {
    return $DB->get_record_sql(
        <<<EOS
            SELECT
                'student' IN (
                    SELECT
                        {role}.shortname
                    FROM
                        {role}
                        INNER JOIN {role_assignments}
                            ON {role_assignments}.roleid = {role}.id
                        INNER JOIN {context}
                            ON {context}.id = {role_assignments}.contextid
                    WHERE
                        {role_assignments}.userid = :user_id
                        AND {context}.instanceid = :this_course_id
                ) AS is_student
            ;
        EOS,
        ['user_id' => $user_id, 'this_course_id' => $course_id]
    )->is_student;
}

?>

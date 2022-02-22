<?php

/** Credit: https://stackoverflow.com/a/53121360/5726823 */
function path_join(...$parts) {
    return preg_replace('#' . DIRECTORY_SEPARATOR . '+#', DIRECTORY_SEPARATOR, implode(DIRECTORY_SEPARATOR, array_filter($parts)));
}

// For objects $DB, $USER, $COURSE
require_once(path_join(__DIR__, '../../config.php'));

require(path_join(__DIR__, './db_queries.php'));


/** Determines if the Moodle user is currently viewing their dashboard. */
function is_on_dashboard_page() {
    return strpos(getcwd(), 'my') !== false;
}

/** Determines if the Moodle user is currently viewing a course page. */
function is_on_course_page() {
    return strpos(getcwd(), 'course') !== false;
}

/**
 * Determines if the Moodle user is a student.
 *
 * TODO: not implemented
 */
function is_student() {
    return true;
}

function resolve_hashed_script($script_name, $script_directory = '.') {
    $candidates = scandir($script_directory);
    foreach ($candidates as $candidate) {
        if (stripos($candidate, $script_name) === 0) {
            return path_join($script_directory, $candidate);
        }
    }

    return NULL;
}

/** Generate a JS variable declaration with a given name and a JSON-serializable value. */
function generate_declaration($variable_name, $value) {
    return "const $variable_name = " . json_encode($value);
}

/**
 * Return a content object containing HTML with a target element and an inlined script.
 *
 * Optionally sets global variables for the script.
 */
function embed_js($script_path, $variables = [], $target_div_id = 'workload-target') {
    $script = file_get_contents($script_path);

    $init_data = implode(';', array_map('generate_declaration', array_keys($variables), $variables));

    $content = new stdClass;
    $content->text =
        html_writer::tag('script', $init_data)
        . html_writer::tag('script', $script, array('type' => "module"))
        . html_writer::empty_tag('div', array('id' => $target_div_id));
    return $content;
}

class block_workload extends block_base {
    public function init() {
        $this->title = get_string('workload', 'block_workload');
    }

    public function get_content() {
        global $USER;
        global $COURSE;
        global $DB;

        // Commented out in hopes of faster reloading in development
        // if ($this->content !== null) {
        //   return $this->content;
        // }

        if (is_on_dashboard_page()) {
            if (is_student()) {
                $variables = array(
                    'upcomingDeadlines' => get_upcoming_deadlines_for_student($DB, $USER->id),
                );
                $script_name = 'student-dashboard';
            } else {
                $script_name = NULL;
            }
        } else if (is_on_course_page()) {
            if (is_student()) {
                $variables = array(
                    'upcomingDeadlines' => get_upcoming_deadlines_from_course($DB, $COURSE->id),
                    'ungradedSubmissions' => get_ungraded_submissions_from_course($DB, $COURSE->id, $USER->id),
                );
                $script_name = 'student-course';
            } else {
                $variables = [];
                $script_name = 'instructor-course';
            }
        }

        $this->content = embed_js(
            resolve_hashed_script($script_name, path_join(__DIR__, './ui/dist/assets')),
            $variables
        );

        return $this->content;
    }

    // public function html_attributes() {
    //     $attributes = parent::html_attributes();
    //     return $attributes;
    // }

    public function applicable_formats() {
        return array(
            'my' => true,
            'course-view' => true,
        );
    }
}

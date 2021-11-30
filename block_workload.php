<?php

/** Credit: https://stackoverflow.com/a/53121360/5726823 */
function path_join(...$parts) {
    return preg_replace('#' . DIRECTORY_SEPARATOR . '+#', DIRECTORY_SEPARATOR, implode(DIRECTORY_SEPARATOR, array_filter($parts)));
}

class block_workload extends block_base {
    public function init() {
        $this->title = get_string('workload', 'block_workload');
    }

    public function get_content() {
        // if ($this->content !== null) {
        //   return $this->content;
        // }
        if (strpos(getcwd(), 'my') !== false) {
            $script = file_get_contents(path_join(__DIR__, 'index-alt.js'));
        } else {
            $script = file_get_contents(path_join(__DIR__, 'index.js'));
        }

        $this->content = new stdClass;
        $this->content->text = html_writer::empty_tag('div', array('id' => 'deployment_target')) . html_writer::tag('script', $script);

        return $this->content;
    }

    public function html_attributes() {
        $attributes = parent::html_attributes();
        return $attributes;
    }
}

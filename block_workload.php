<?php

class block_workload extends block_base {
    public function init() {
        $this->title = get_string('workload', 'block_workload');
    }

    public function get_content() {
        if ($this->content !== null) {
          return $this->content;
        }

        $this->content         =  new stdClass;
        $this->content->text   = 'Hello, World!';

        return $this->content;
    }

    public function html_attributes() {
        $attributes = parent::html_attributes();
        return $attributes;
    }
}

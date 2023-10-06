<?php

namespace App\Services;

use Illuminate\Support\Facades\Validator;

abstract class AbstractService {

    protected $rules;

    protected function validate(array $data): array
    {
        return Validator::validate($data, $this->rules);
    }
}
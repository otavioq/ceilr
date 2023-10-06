<?php

namespace App\Services;

use Illuminate\Support\Facades\Validator;

abstract class AbstractService {

    /**
     * Array com regras de validação
     */
    protected array $rules;

    /**
     * Método para realizar a validação de informações
     * 
     * @param array $data Um array contendo os dados a serem validados
     */
    protected function validate(array $data): array
    {
        return Validator::validate($data, $this->rules);
    }
}
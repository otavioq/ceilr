<?php

namespace App\Services;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * Encapsula métodos relacionados à autenticação de usuário
 */
class AuthService extends AbstractService
{
    /**
     * Método para validar os campos de senha e confirmação
     * 
     * @throws \Illuminate\Validation\ValidationException;
     */
    public static function passwordValidation(array $data): string
    {
        $error = '';

        if (empty($data['password'])) {
            $error = 'Informe uma senha';
        }

        if (empty($data['password_confirmation'])) {
            $error = 'Confime sua senha';
        }

        if (strlen($data['password']) < 6) {
            $error = 'A senha deve ter, no mínimo, 6 caracteres';
        }

        if ($data['password'] !== $data['password_confirmation']) {
            $error = "As senhas não condizem";
        }

        if (!empty($error)) {
            throw ValidationException::withMessages(['password' => $error]);
        }

        return Hash::make($data['password']);
    }
}
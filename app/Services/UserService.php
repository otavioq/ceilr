<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

/**
 * Classe para manipulação do resgistro de usuário
 */
class UserService extends AbstractService
{
    /**
     * Registra um novo usuário
     * 
     * @param array $data Um array contendo os dados para a criação do registro
     * @throws \Illuminate\Validation\ValidationException;
     */
    public function register(array $data): User
    {
        $this->rules = [
            'name' => 'required|string|max:255',
            'email' => "required|email|max:255|unique:users,email",
            'password' => 'required|string|min:6|max:255',
            'password_confirmation' => 'required|string|max:255'
        ];

        $validData = $this->validate($data);
        $validData['password'] = AuthService::passwordValidation($validData);

        return User::create($validData);
    }

    /**
     * Valida as informações e autentica o usuário
     * 
     * @param array $data Um array com as credenciais para autenticação
     * @throws \Illuminate\Validation\ValidationException;
     */
    public function login(array $data): User
    {
        $this->rules = [
            'email' => "required|email",
            'password' => 'required|string'
        ];

        $validData = $this->validate($data);
        $token = Auth::attempt($validData);

        if (empty($token)) {
            throw ValidationException::withMessages(['Não autorizado']);
        }

        $user = user();
        $user->token = $token;

        return $user;
    }

    /**
     * Método para invalidar a sessão do usuário
     */
    public function logout(): void
    {
        Auth::logout();
    }
}
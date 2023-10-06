<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserService extends AbstractService
{

    private $id;

    public function __construct(int $id = null)
    {
        $this->id = $id;

        $this->rules = !empty($id)
        ? [
            'name' => 'required|string|max:255',
            'email' => "required|email|max:255|unique:users,email,{$id}",
            'password' => 'nullable|string|min:6|max:255'
        ]
        : [
            'name' => 'required|string|max:255',
            'email' => "required|email|max:255|unique:users,email",
            'password' => 'required|string|min:6|max:255',
            'password_confirmation' => 'required|string|max:255'
        ];
    }


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

    public function logout(): void
    {
        Auth::logout();
    }
}
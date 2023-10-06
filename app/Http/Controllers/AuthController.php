<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

/**
 * Controlador de autenticacão de usuário
 */
class AuthController extends Controller
{
    /**
     * @var \App\Services\UserService
     */
    private $userService;

    public function __construct()
    {
        $this->userService = new UserService;
    }

    /**
     * Método para realizar o login
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $user = $this->userService->login($request->only(['email', 'password']));

            $response = ['success' => true, 'data' => $user];
            $code = 200;
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
            $code = 401;
        }

        return response()->json($response, $code);
    }

    /**
     * Método para realizar o cadastro
     */
    public function register(Request $request)
    {
        try {
            $user = $this->userService->register($request->all());

            $response = ['success' => true, 'data' => $user];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }
    
    /**
     * Método para verificar autenticação do usuário
     */
    public function me()
    {
        try {
            $response = ['success' => true, 'data' => user()];
            $code = 200;
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
            $code = 403;
        }

        return response()->json($response, $code);
    }
    
    /**
     * Método para realizar o logout
     */
    public function logout()
    {
        try {
            $this->userService->logout();

            $response = ['success' => true, 'data' => true];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }
}

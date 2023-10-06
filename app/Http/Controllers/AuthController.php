<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $userService = new UserService();
            $user = $userService->login($request->only(['email', 'password']));

            $response = ['success' => true, 'data' => $user];
            $code = 200;
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
            $code = 401;
        }

        return response()->json($response, $code);
    }

    public function register(Request $request)
    {
        try {
            $userService = new UserService();
            $user = $userService->register($request->all());

            $response = ['success' => true, 'data' => $user];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }
    
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
    
    public function logout()
    {
        try {
            $userService = new UserService();
            $userService->logout();

            $response = ['success' => true, 'data' => true];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }
}

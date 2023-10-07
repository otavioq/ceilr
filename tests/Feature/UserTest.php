<?php

namespace Tests\Feature;

use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends AbstractFeature
{
    use RefreshDatabase;

    /**
     * Testa o sucesso do end-point de registro de usuário
     */
    public function testRegisterUserSuccess(): void
    {
        $response = $this->post('/api/auth/register', $this->testUserData);

        $response->assertStatus(200);
    }

    /**
     * Testa a falha do end-point de registro de usuário
     */
    public function testRegisterUserFail(): void
    {
        $response = $this->post('/api/auth/register');

        $response->assertStatus(200);
        $response->assertJsonFragment(['success' => false]);
    }

    /**
     * Testa o sucesso do end-point de login
     */
    public function testLoginSuccess(): void
    {
        $userService = new UserService;
        $userService->register($this->testUserData);

        $response = $this->post('/api/auth/login', $this->testUserData);

        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => ['id', 'name', 'email', 'token']]);
    }

    /**
     * Testa a falha do end-point de login
     */
    public function testLoginFail(): void
    {
        $response = $this->post('/api/auth/login', $this->testUserData);

        $response->assertStatus(401);
    }

    /**
     * Testa o sucesso do end-point de autenticação de usuário
     */
    public function testGetSelfSuccess(): void
    {
        $token = $this->setupTestUser();
        $response = $this->get('/api/me', ['Authorization' => 'Bearer '.$token]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $this->user->id,
            'name' => $this->user->name,
            'email' => $this->user->email
        ]);
    }

    /**
     * Testa a falha do end-point de autenticação de usuário
     */
    public function testGetSelfFail(): void
    {
        $response = $this->get('/api/me', ['Authorization' => 'Bearer invalid_auth_token']);
        $response->assertStatus(401);
    }

    /**
     * Testa o sucesso do end-point de logout
     */
    public function testLogoutSuccess(): void
    {
        $token = $this->setupTestUser();
        $response = $this->post('/api/logout', [], ['Authorization' => 'Bearer '.$token]);

        $response->assertStatus(200);
        $response->assertJsonFragment(['success' => true]);
    }

    /**
     * Testa a falha do end-point de logout
     */
    public function testLogoutFail(): void
    {
        $response = $this->post('/api/logout', [], ['Authorization' => 'Bearer invalid_auth_token']);
        $response->assertStatus(401);
    }
}

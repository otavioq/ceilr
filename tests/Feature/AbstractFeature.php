<?php

namespace Tests\Feature;

use App\Models\Property;
use App\Models\User;
use App\Services\PropertyService;
use Exception;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Tests\TestCase;

abstract class AbstractFeature extends TestCase
{
    protected $user;

    /**
     * Array com dados para registro de um usuário de teste
     */
    protected $testUserData = [
        'name' => 'Otávio',
        'email' => 'test@email.com',
        'password' => 'test_password',
        'password_confirmation' => 'test_password',
    ];

    /**
     * Array com dados de um imóvel de teste
     */
    protected $testPropertyData = [
        'type' => 'house',
        'price' => 1000.00,
        'status' => 'available',
        'state' => 'Espírito Santo',
        'city' => 'Ibatiba',
        'district' => 'Centro',
        'street' => 'Rua Teste da Silva',
        'number' => '280',
    ];

    /**
     * Simula um usuário autenticado
     * 
     * @return string O token de autenticação de api
     */
    protected function setupTestUser(): string
    {
        $userData = [
            'id' => 1,
            'name' => 'Otávio',
            'email' => 'test@email.com',
            'password' => 'test_password',
        ];
        
        $this->user = User::factory()->create($userData);
        Auth::setUser($this->user);
        return JWTAuth::fromUser($this->user);
    }

    /**
     * Cria um registro de imóvel de teste
     * 
     * @throws \Exception
     */
    protected function getTestProperty(): Property
    {
        if (empty($this->user)) {
            throw new Exception('É preciso criar o usuário de teste antes de criar um imóvel de teste');
        }
        
        $propertyService = new PropertyService;
        return $propertyService->create($this->testPropertyData);
    }
}
<?php

namespace Tests\Feature;

use App\Models\Property;
use App\Services\PropertyService;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PropertyTest extends AbstractFeature
{
    use RefreshDatabase;

    /**
     * Testa o sucesso do end-point de criação de um imóvel
     */
    public function testCreatePropertySuccess(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $response = $this->post('/api/properties', $this->testPropertyData, $authorization);

        $response->assertStatus(200);
        $response->assertJsonFragment(['success' => true]);
    }

    /**
     * Testa a falha do end-point de criação de um imóvel
     */
    public function testCreatePropertyFail(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $response = $this->post('/api/properties', [], $authorization);

        $response->assertStatus(200);
        $response->assertJsonFragment(['success' => false]);
    }

    /**
     * Testa o sucesso do end-point de alteração de um imóvel
     */
    public function testUpdatePropertySuccess(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $property = $this->getTestProperty();

        $response = $this->put("/api/properties/{$property->id}", $this->testPropertyData, $authorization);

        $response->assertStatus(200);
        $response->assertJsonFragment(['success' => true]);
    }

    /**
     * Testa a falha do end-point de alteração de um imóvel
     */
    public function testUpdatePropertyFail(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $property = $this->getTestProperty();

        $response = $this->put("/api/properties/{$property->id}", [], $authorization);

        $response->assertStatus(200);
        $response->assertJsonFragment(['success' => false]);
    }

    /**
     * Testa o sucesso do end-point de alteração do status de um imóvel
     */
    public function testUpdatePropertyStatusSuccess(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $property = $this->getTestProperty();

        $validStatus = array_keys(Property::STATUS)[0];

        $response = $this->put("/api/properties/status/{$property->id}", ['status' => $validStatus], $authorization);

        $response->assertStatus(200);
        $response->assertJsonFragment(['success' => true]);
    }

    /**
     * Testa a falha do end-point de alteração do status de um imóvel
     */
    public function testUpdatePropertyStatusFail(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $property = $this->getTestProperty();

        $response = $this->put("/api/properties/status/{$property->id}", ['status' => 'invalid_status'], $authorization);

        $response->assertStatus(200);
        $response->assertJsonFragment(['success' => false]);
    }

    /**
     * Testa o sucesso do end-point de listagem de imóveis
     */
    public function testListPropertiesSuccess(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $property = $this->getTestProperty();

        $response = $this->get("/api/properties", $authorization);

        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $property->id]);
    }

    /**
     * Testa o sucesso do end-point de busca de imóvel por identificador
     */
    public function testFindPropertySuccess(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $property = $this->getTestProperty();

        $response = $this->get("/api/properties/{$property->id}", $authorization);

        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => $property->id]);
    }

    /**
     * Testa a falha do end-point de busca de imóvel por identificador
     */
    public function testFindPropertyFail(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $response = $this->get("/api/properties/10", $authorization);

        $response->assertStatus(404);
        $response->assertJsonFragment(['success' => false]);
    }

    /**
     * Testa o sucesso do end-point de exclusão de imóvel por identificador
     */
    public function testDeletePropertySuccess(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $property = $this->getTestProperty();

        $response = $this->delete("/api/properties/{$property->id}", [], $authorization);

        $response->assertStatus(200);
        $response->assertJsonFragment(['data' => true]);
    }

    /**
     * Testa o sucesso do end-point de exclusão de imóvel por identificador
     */
    public function testDeletePropertyFail(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $response = $this->delete("/api/properties/10", [], $authorization);

        $response->assertStatus(404);
        $response->assertJsonFragment(['success' => false]);
    }

    /**
     * Testa o sucesso do end-point de listagem dos tipos de imóvel
     */
    public function testPropertyTypesSuccess(): void
    {
        $token = $this->setupTestUser();
        $authorization = ['Authorization' => 'Bearer '.$token];

        $response = $this->get("/api/property-types", $authorization);

        $response->assertStatus(200);
        $response->assertJsonFragment(['data' => Property::TYPES]);
    }
}

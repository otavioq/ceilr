<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Services\PropertyService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Controlador de imóveis
 */
class PropertiesController extends Controller
{
    /**
     * @var \App\Services\PropertyService
     */
    private $propertyService;

    public function __construct()
    {
        $this->propertyService = new PropertyService;
    }

    /**
     * Cria um novo registro
     */
    public function create(Request $request): JsonResponse
    {
        try {
            $property = $this->propertyService->create($request->all());

            $response = ['success' => true, 'data' => new PropertyResource($property)];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    /**
     * Lista todos os registros
     */
    public function list(Request $request): JsonResponse
    {
        try {
            $properties = $this->propertyService->list($request->all());

            $response = ['success' => true, 'data' => PropertyResource::collection($properties)];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    /**
     * Busca um registro pelo seu identificador
     */
    public function find(int $id): JsonResponse
    {
        $code = 200;
        try {
            $property = $this->propertyService->find($id);

            $response = ['success' => true, 'data' => new PropertyResource($property)];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        } catch (HttpException $e) {
            $response = ['success' => false, 'messages' => [$e->getMessage()]];
            $code = $e->getStatusCode();
        }

        return response()->json($response, $code);
    }

    /**
     * Altera um registro pelo seu identificador
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $property = $this->propertyService->update($request->all(), $id);

            $response = ['success' => true, 'data' => new PropertyResource($property)];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    /**
     * Altera o status do imóvel
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        try {
            $property = $this->propertyService->updateStatus($request->only(['status']), $id);

            $response = ['success' => true, 'data' => new PropertyResource($property)];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    /**
     * Remove um registro pelo seu identificador
     */
    public function delete(int $id): JsonResponse
    {
        $code = 200;
        try {
            $result = $this->propertyService->delete($id);

            $response = ['success' => true, 'data' => $result];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        } catch (HttpException $e) {
            $response = ['success' => false, 'messages' => [$e->getMessage()]];
            $code = $e->getStatusCode();
        }

        return response()->json($response, $code);
    }

    /**
     * Recupera os tipos de imóvel
     */
    public function getTypes(): JsonResponse
    {
        try {
            $result = $this->propertyService->types();

            $response = ['success' => true, 'data' => $result];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    /**
     * Recupera os status de imóvel
     */
    public function getStatuses(): JsonResponse
    {
        try {
            $result = $this->propertyService->statuses();

            $response = ['success' => true, 'data' => $result];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    /**
     * Recupera os relatório de imóveis
     */
    public function getPropertyReport(): JsonResponse
    {
        try {
            $result = $this->propertyService->report();

            $response = ['success' => true, 'data' => $result];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }
}

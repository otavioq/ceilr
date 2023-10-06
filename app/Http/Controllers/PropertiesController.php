<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Services\PropertyService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PropertiesController extends Controller
{
    public function create(Request $request)
    {
        try {
            $propertyService = new PropertyService();
            $property = $propertyService->create($request->all());

            $response = ['success' => true, 'data' => new PropertyResource($property)];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    public function list(Request $request)
    {
        try {
            $propertyService = new PropertyService();
            $properties = $propertyService->list($request->all());

            $response = ['success' => true, 'data' => PropertyResource::collection($properties)];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function find(int $id)
    {
        try {
            $propertyService = new PropertyService();
            $property = $propertyService->find($id);

            $response = ['success' => true, 'data' => new PropertyResource($property)];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        try {
            $propertyService = new PropertyService();
            $property = $propertyService->update($request->all(), $id);

            $response = ['success' => true, 'data' => new PropertyResource($property)];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    public function updateStatus(Request $request, int $id)
    {
        try {
            $propertyService = new PropertyService();
            $property = $propertyService->updateStatus($request->only(['status']), $id);

            $response = ['success' => true, 'data' => new PropertyResource($property)];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(int $id)
    {
        try {
            $propertyService = new PropertyService();
            $result = $propertyService->delete($id);

            $response = ['success' => true, 'data' => $result];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }

    public function getTypes()
    {
        try {
            $propertyService = new PropertyService();
            $result = $propertyService->types();

            $response = ['success' => true, 'data' => $result];
        } catch (ValidationException $e) {
            $response = ['success' => false, 'messages' => $e->errors()];
        }

        return response()->json($response);
    }
}

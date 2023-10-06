<?php

namespace App\Services;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PropertyService extends AbstractService
{
    public function types(): array
    {
        return Property::TYPES;
    }

    public function list(array $filters = []): Collection
    {
        $this->rules = [
            'type' => 'nullable|string',
            'state' => 'nullable|string',
            'city' => 'nullable|string',
            'district' => 'nullable|string',
            'street' => 'nullable|string',
            'number' => 'nullable|string',
            'price' => 'nullable|string'
        ];
        $validFilters = $this->validate($filters);

        /**
         * @var User
         */
        $user = user();

        $properties = $user->properties();

        if (!empty($validFilters)) {
            foreach ($validFilters as $key => $value) {
                $properties->where($key, $value);
            }
        }

        return $properties->where('status', '!=', Property::DELETED)->get();
    }

    public function create(array $data): Property
    {
        $this->rules = [
            'type' => ['required', Rule::in(array_keys(Property::TYPES))],
            'state' => 'nullable|string',
            'city' => 'nullable|string',
            'district' => 'nullable|string',
            'street' => 'required|string',
            'number' => 'required|string',
            'price' => 'nullable|numeric|min:0',
        ];

        $validData = $this->validate($data);

        $user = user();
        return $user->properties()->create($validData);
    }

    public function update(array $data, int $id): Property
    {
        $property = $this->find($id);

        $this->rules = [
            'type' => ['required', Rule::in(array_keys(Property::TYPES))],
            'state' => 'nullable|string',
            'city' => 'nullable|string',
            'district' => 'nullable|string',
            'street' => 'required|string',
            'number' => 'required|string',
            'price' => 'nullable|numeric|min:0',
        ];

        $validData = $this->validate($data);
        $property->update($validData);

        return $property;
    }

    public function updateStatus(array $data, int $id): Property
    {
        $property = $this->find($id);

        $this->rules = [
            'status' => ['required', Rule::in(array_keys(Property::STATUS))],
        ];

        $validData = $this->validate($data);
        $property->update($validData);

        return $property;
    }

    public function delete(int $id): bool
    {
        $property = $this->find($id);

        return $property->update(['status' => Property::DELETED]);
    }

    public function find(int $id): Property
    {
        $user = user();
        $property = $user->properties()
            ->where('status', '!=', Property::DELETED)
            ->find($id);

        if (empty($property)) {
            throw new HttpException(404, 'Registro não encontrado');
        }

        return $property;
    }
}
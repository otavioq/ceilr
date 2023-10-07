<?php

namespace App\Services;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Classe para manipulação de registros de imóvel
 */
class PropertyService extends AbstractService
{
    /**
     * Recupera os tipos de imóvel
     */
    public function types(): array
    {
        return Property::TYPES;
    }

    /**
     * Recupera os status de imóvel
     */
    public function statuses(): array
    {
        return array_filter(Property::STATUS, function($item, $key) {
            return $key !== 'deleted';
        }, ARRAY_FILTER_USE_BOTH);
    }

    /**
     * Recupera os relatório de imóveis
     */
    public function report(): array
    {
        $statuses = $this->statuses();

        $report = [];
        foreach ($statuses as $status => $labels) {
            $properties = $this->list(['status' => $status]);
            $report[$status] = [
                'labels' => $labels,
                'properties' => count($properties)
            ];
        }

        return $report;
    }

    /**
     * Lista todos os registros
     * 
     * @param array $filters Um array com filtros para a listagem* 
     * @throws \Illuminate\Validation\ValidationException;
     */
    public function list(array $filters = []): Collection
    {
        $this->rules = [
            'type' => 'nullable|string',
            'state' => 'nullable|string',
            'city' => 'nullable|string',
            'district' => 'nullable|string',
            'street' => 'nullable|string',
            'number' => 'nullable|string',
            'price' => 'nullable|string',
            'status' => 'nullable|string',
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

        return $properties->where('status', '!=', Property::DELETED)
            ->orderBy('id', 'desc')
            ->get();
    }

    /**
     * Cria um novo registro
     * 
     * @param array $data Um array com os dados a serem inseridos no regitro
     * @throws \Illuminate\Validation\ValidationException;
     */
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

    /**
     * Altera um registro
     * 
     * @param array $data Um array com os dados a serem alterados
     * @param int $id Identificador do registro a ser alterado
     * @throws \Illuminate\Validation\ValidationException
     */
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

    /**
     * Altera o status de um imóvel
     * 
     * @param array $data Um array contendo o novo status
     * @param int $id Identificador do registro a ser alterado
     * @throws \Illuminate\Validation\ValidationException
     */
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

    /**
     * Exclui um imóvel
     * 
     * @param int $id Identificador do registro a ser excluído
     */
    public function delete(int $id): bool
    {
        $property = $this->find($id);

        return $property->update(['status' => Property::DELETED]);
    }

    /**
     * Busca um registro pelo seu identificador
     * 
     * @param int $id Identificador do reistro a ser buscado
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException
     */
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
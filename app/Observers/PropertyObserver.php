<?php

namespace App\Observers;

use App\Models\Property;
use Illuminate\Validation\ValidationException;

class PropertyObserver
{

    /**
     * Observa a criação e edição do registro de imóvel para validação do status
     * 
     * @throws \Illuminate\Validation\ValidationException
     */
    public function saving(Property $property): void
    {
        if (empty($property->id)) {
            $property->status = Property::AVAILABLE;
            $property->saveQuietly();
        } else {
            if (!in_array($property->status, array_keys(Property::STATUS))) {
                throw ValidationException::withMessages(['Status inválido']);
            }
        }
    }
}

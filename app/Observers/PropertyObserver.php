<?php

namespace App\Observers;

use App\Models\Property;
use Illuminate\Validation\ValidationException;

class PropertyObserver
{
    /**
     * Handle the Property "created" event.
     */
    public function created(Property $property): void
    {
        //
    }

    /**
     * Handle the Property "updated" event.
     */
    public function updated(Property $property): void
    {
        //
    }

    public function saving(Property $property)
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

    /**
     * Handle the Property "deleted" event.
     */
    public function deleted(Property $property): void
    {
        //
    }

    /**
     * Handle the Property "restored" event.
     */
    public function restored(Property $property): void
    {
        //
    }

    /**
     * Handle the Property "force deleted" event.
     */
    public function forceDeleted(Property $property): void
    {
        //
    }
}

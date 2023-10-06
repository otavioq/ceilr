<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $result = parent::toArray($request);

        return array_merge($result, [
            'status_text' => $this->getStatusText(),
            'type_text' => $this->getTypeText(),
            'address' => $this->getAddress()
        ]);
    }
}

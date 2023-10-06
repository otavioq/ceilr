<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Property extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'properties';
    protected $primaryKey = 'id';

    const AVAILABLE = 'available';
    const SOLD = 'sold';
    const RENTED = 'rented';
    const DELETED = 'deleted';

    const STATUS = [
        self::AVAILABLE => 'Disponível',
        self::SOLD => 'Vendido',
        self::RENTED => 'Alugado',
        self::DELETED => 'Deletado'
    ];

    const TYPES = [
        'house' => 'Casa',
        'apartment' => 'Apartamento',
        'office' => 'Escritório',
        'edifice' => 'Edifício',
        'terrain' => 'Terreno'
    ];

    protected $fillable = [
        'id',
        'type',
        'status',
        'state',
        'city',
        'district',
        'street',
        'number',
        'price',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getStatusText(): string
    {
        return self::STATUS[$this->status];
    }

    public function getTypeText(): string
    {
        return self::TYPES[$this->type];
    }

    public function getAddress(): string
    {
        $fields = [
            [ 'value' => $this->street, 'prepend' => '', 'append' => ', ' ],
            [ 'value' => $this->number, 'prepend' => 'nº ', 'append' => ', ' ],
            [ 'value' => $this->district, 'prepend' => '', 'append' => ', ' ],
            [ 'value' => $this->city, 'prepend' => '', 'append' => ' ' ],
            [ 'value' => $this->state, 'prepend' => '- ', 'append' => '' ],
        ];

        $str = "";
        foreach ($fields as $field) {
            $str .= $field['prepend'].$field['value'].$field['append'];
        }

        return $str;
    }
}

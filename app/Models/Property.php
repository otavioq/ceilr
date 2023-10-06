<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

/**
 * Modelo de registro de imóvel
 */
class Property extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'properties';
    protected $primaryKey = 'id';

    const AVAILABLE = 'available';
    const SOLD = 'sold';
    const RENTED = 'rented';
    const DELETED = 'deleted';

    /**
     * Array contendo os possíveis status de um imóvel
     */
    const STATUS = [
        self::AVAILABLE => 'Disponível',
        self::SOLD => 'Vendido',
        self::RENTED => 'Alugado',
        self::DELETED => 'Deletado'
    ];

    /**
     * Array contendo os possíveis tipos de um imóvel
     */
    const TYPES = [
        'house' => 'Casa',
        'apartment' => 'Apartamento',
        'office' => 'Escritório',
        'edifice' => 'Edifício',
        'terrain' => 'Terreno'
    ];

    /**
     * Array contendo as colunas preenchíveis
     */
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

    /**
     * Relação entre imóvel e usuário
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Recupera o texto do status do imóvel
     */
    public function getStatusText(): string
    {
        return self::STATUS[$this->status];
    }

    /**
     * Recupera o texto do tipo do imóvel
     */
    public function getTypeText(): string
    {
        return self::TYPES[$this->type];
    }

    /**
     * Monta um texto com a informação do endereço do imóvel
     */
    public function getAddress(): string
    {
        $fields = [
            [ 'value' => $this->street, 'prepend' => '', 'append' => ', ' ],
            [ 'value' => $this->number ?: 'S/N', 'prepend' => $this->number ? 'nº ' : '', 'append' => ', ' ],
            [ 'value' => $this->district, 'prepend' => '', 'append' => ', ' ],
            [ 'value' => $this->city, 'prepend' => '', 'append' => ' ' ],
            [ 'value' => $this->state, 'prepend' => '- ', 'append' => '' ],
        ];

        $str = "";
        foreach ($fields as $field) {
            if (empty($field['value'])) {
                continue;
            }

            $str .= $field['prepend'].$field['value'].$field['append'];
        }

        return $str;
    }
}

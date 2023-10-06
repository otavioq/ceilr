<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            // $table->bigInteger('user_id');
            $table->char('type');
            $table->enum('status', ['available', 'sold', 'rented', 'deleted']);
            $table->char('state', 255)->nullable();
            $table->char('city', 255)->nullable();
            $table->char('district', 255)->nullable();
            $table->char('street', 255)->nullable();
            $table->char('number')->nullable();
            $table->decimal('price', 12, 2)->nullable();
            $table->timestamps();
            // $table->foreign('user_id')->references('id')->on('users');
            // $table->foreignIdFor(User::class);
            $table->foreignId('user_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};

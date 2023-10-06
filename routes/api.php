<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PropertiesController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function() {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

Route::group(['middleware' => 'auth'], function() {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('property-types', [PropertiesController::class, 'getTypes']);

    Route::group(['prefix' => 'properties'], function() {
        Route::post('/', [PropertiesController::class, 'create']);
        Route::get('/', [PropertiesController::class, 'list']);
        Route::get('/{id}', [PropertiesController::class, 'find']);
        Route::put('/status/{id}', [PropertiesController::class, 'updateStatus']);
        Route::put('/{id}', [PropertiesController::class, 'update']);
        Route::delete('/{id}', [PropertiesController::class, 'delete']);
    });
});

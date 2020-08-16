<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('user', 'AuthController@index');
        Route::get('logout', 'AuthController@logout');
    });
});


Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::get('vehicles', 'VehicleController@index');
    Route::put('vehicle', 'VehicleController@create');
    Route::get('vehicle/{id}', 'VehicleController@show');
    Route::post('vehicle/{id}', 'VehicleController@edit');
    Route::delete('vehicle/{id}', 'VehicleController@delete');
    Route::get('vehicle/{id}/users', 'VehicleController@getUsers');
    Route::put('vehicle/{id}/users', 'VehicleController@addUser');
    Route::post('vehicle/{id}/users', 'VehicleController@editUser');
    Route::delete('vehicle/{id}/users', 'VehicleController@removeUser');
    Route::get('vehicle/{id}/remaining_users', 'VehicleController@getRemainingUsers');

    Route::get('vehicle/{vid}/logs', 'LogController@indexByVehicle');
    
    Route::get('logs', 'LogController@index');
    Route::get('logs/{vid}', 'LogController@indexByVehicle');
    Route::put('log/{vid}', 'LogController@create');
    Route::get('log/{id}', 'LogController@show');
    Route::post('log/{id}', 'LogController@edit');
    Route::delete('log/{id}', 'LogController@delete');
});

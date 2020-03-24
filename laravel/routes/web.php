<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/js-todo-list', function () {
    return view('js-todo-list');
});
Route::get('/vue-todo-list', function () {
    return view('vue-todo-list');
});
Route::get('/ts-todo-list', function () {
    return view('ts-todo-list');
});


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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/books/onsale', 'Apicontroller@index');
Route::get('/books/recommended', 'Apicontroller@recommended');
Route::get('/books/popular', 'Apicontroller@popular');
Route::get('/book/{id}', 'Apicontroller@book');
Route::get('/book/reviews/{id}/{star}', 'Apicontroller@review');
Route::get('/categories', 'Apicontroller@categories');
Route::get('/authors', 'Apicontroller@authors');
Route::get('/books', 'Apicontroller@books');
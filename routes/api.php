<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Apicontroller;
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

Route::get('/books/onsale', [Apicontroller::class,'index']);
Route::get('/books/recommended', [Apicontroller::class,'recommended']);
Route::get('/books/popular', [Apicontroller::class,'popular']);
Route::get('/book/{id}', [Apicontroller::class,'book']);
Route::get('/book/reviews/{id?}/{star?}', [Apicontroller::class,'review']);
Route::get('/categories', [Apicontroller::class,'categories']);
Route::get('/authors', [Apicontroller::class,'authors']);
Route::get('/books', [Apicontroller::class,'books']);
<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ShopController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\FilterController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
/*Home*/
Route::get('/books/topOnsale', [HomeController::class,'onsale']);
Route::get('/books/topRecommended', [HomeController::class,'recommended']);
Route::get('/books/topPopular', [HomeController::class,'popular']);
/*Shop*/
Route::get('/books/onsale/{pageno?}', [ShopController::class,'onsale']);
Route::get('/books/popular/{pageno?}', [ShopController::class,'popular']);
Route::get('/books/all/{sort?}/{pageno?}', [ShopController::class,'books']);

Route::get('/books/onsale/{pageno?}/author/{id?}', [FilterController::class,'onsaleAuthor']);
Route::get('/books/popular/{pageno?}/author/{id?}', [FilterController::class,'popularAuthor']);
Route::get('/books/all/{sort?}/{pageno?}/author/{id?}', [FilterController::class,'booksAuthor']);

Route::get('/books/onsale/{pageno?}/category/{id?}', [FilterController::class,'onsaleCategory']);
Route::get('/books/popular/{pageno?}/category/{id?}', [FilterController::class,'popularCategory']);
Route::get('/books/all/{sort?}/{pageno?}/category/{id?}', [FilterController::class,'booksCategory']);

Route::get('/books/onsale/{pageno?}/star/{id?}', [FilterController::class,'onsaleStar']);
Route::get('/books/popular/{pageno?}/star/{id?}', [FilterController::class,'popularStar']);
Route::get('/books/all/{sort?}/{pageno?}/star/{id?}', [FilterController::class,'booksStar']);

/*Product*/
Route::get('/book/{id}', [ProductController::class,'book']);
Route::get('/book/reviews/{id?}/{star?}/{pageno?}/{sort?}', [ProductController::class,'review']);
Route::get('/authors', [ProductController::class,'authors']);
Route::get('/categories', [ProductController::class,'categories']);
Route::post('/book/review', [ProductController::class,'reviews']);
/*Cart*/
Route::post('/orders', [OrderController::class, 'orders']);

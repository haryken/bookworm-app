<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Review;
use App\Http\Resources\BookResource;

use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function onsale($pageno=5)
    {
        $books = Book::join('discounts', 'books.id', 'discounts.book_id')
                        ->join('authors', 'books.author_id', 'authors.id')
                        ->join('categories', 'books.category_id', 'categories.id')
                        ->selectRaw('*,books.id')
                        ->SelectSubPrice()
                        ->State()
                        ->whereRaw('(discounts.discount_start_date <= now() and discounts.discount_end_date >= now())
                                    or (discounts.discount_start_date <= now() and discounts.discount_end_date is null )')
                        ->orderBy('sub_price', 'desc')
                        ->paginate($pageno);
        return $books;
    }

    public function popular($pageno=5){
        $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                    ->join('authors', 'books.author_id', 'authors.id')
                    ->selectRaw('*,books.id')
                    ->join('categories', 'books.category_id', 'categories.id')
                    ->SelectSubPrice()
                    ->State()
                    ->paginate($pageno);
            return $books;
    }
    public function books($sort='asc',$pageno=5){
        $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                        ->join('authors', 'books.author_id', 'authors.id')
                        ->selectRaw('*,books.id')
                        ->join('categories', 'books.category_id', 'categories.id')
                        ->SelectSubPrice()
                        ->State()
                        ->orderby('sub_price',$sort)
                        ->paginate($pageno);
        return $books;
    }
}

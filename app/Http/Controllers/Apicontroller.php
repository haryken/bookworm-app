<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Review;
use App\Models\Category;
use App\Models\Author;

use Illuminate\Http\Request;

class Apicontroller extends Controller
{
    public function index()
    {
        $books = Book::join('discounts', 'books.id', 'discounts.book_id')
                        ->join('authors', 'books.author_id', 'authors.id')
                        ->join('categories', 'books.category_id', 'categories.id')
                        ->selectRaw('*,books.book_price - discounts.discount_price as sub_price,
                                    (CASE
                                    WHEN (discounts.discount_start_date <= now() and discounts.discount_end_date >= now())
                                    or (discounts.discount_start_date <= now() and discounts.discount_end_date is null ) THEN 1
                                    ELSE 0
                                    end) AS state')
                        ->whereRaw('(discounts.discount_start_date <= now() and discounts.discount_end_date >= now())
                                    or (discounts.discount_start_date <= now() and discounts.discount_end_date is null )')
                        ->orderBy('sub_price', 'desc')
                        ->get();
        return $books;
    }

    public function recommended(){
                    $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                    ->join('authors', 'books.author_id', 'authors.id')
                    ->join('categories', 'books.category_id', 'categories.id')
                    ->selectRaw('* ,
                    (CASE
                        WHEN ((discounts.discount_start_date <= now() and discounts.discount_end_date >= now())
                        or (discounts.discount_start_date <= now() and discounts.discount_end_date is null ))
                        THEN concat(books.book_price-discounts.discount_price)
                        ELSE concat(books.book_price)
                    end) AS sub_price,
                    (CASE
                    WHEN ((discounts.discount_start_date <= now() and discounts.discount_end_date >= now())
                    or (discounts.discount_start_date <= now() and discounts.discount_end_date is null ))
                    THEN 1
                    ELSE 0
                    end) AS state')
                    ->get();
            return $books;
    }
    public function popular(){
        $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                    ->join('authors', 'books.author_id', 'authors.id')
                    ->join('categories', 'books.category_id', 'categories.id')
                    ->selectRaw('* ,
                    (CASE
                        WHEN ((discounts.discount_start_date <= now() and discounts.discount_end_date >= now())
                        or (discounts.discount_start_date <= now() and discounts.discount_end_date is null ))
                        THEN concat(books.book_price-discounts.discount_price)
                        ELSE concat(books.book_price)
                    end) AS sub_price,
                    (CASE
                    WHEN ((discounts.discount_start_date <= now() and discounts.discount_end_date >= now())
                    or (discounts.discount_start_date <= now() and discounts.discount_end_date is null ))
                    THEN 1
                    ELSE 0
                    end) AS state')
                    ->get();
            return $books;
    }
    public function book($id){
        $books = Book::leftjoin('discounts', 'books.id', 'discounts.book_id')
                        ->join('authors', 'books.author_id', 'authors.id')
                        ->where('books.id','like',$id)
                        ->get();
        return $books;

    }
    public function review($id,$star){
        $books = Review::where('reviews.rating_start','like',$star)
                        ->where('reviews.book_id','=',$id)
                        ->get();
        return $books;

    }
    public function categories(){
        $categories = Category::all();
        return $categories;
    }
    public function authors(){
        $authors = Author::all();
        return $authors;
    }
    public function books(){
        $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                        ->join('authors', 'books.author_id', 'authors.id')
                        ->join('categories', 'books.category_id', 'categories.id')
                        ->selectRaw('* ,
                        (CASE
                            WHEN discounts.discount_start_date <= now()
                            and   (discounts.discount_end_date >= now() 
                            or discounts.discount_end_date is null) THEN concat(books.book_price-discounts.discount_price)
                            ELSE concat(books.book_price)
                        end) AS sub_price,
                        (CASE
                        WHEN discounts.discount_start_date <= now()
                        and   (discounts.discount_end_date >= now() 
                        or discounts.discount_end_date is null) THEN 1
                        ELSE 0
                        end) AS state')
                        ->get();
        return $books;
    }
}

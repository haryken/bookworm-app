<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function onsale()
    {
        $books = Book::join('discounts', 'books.id', 'discounts.book_id')
                ->join('authors', 'books.author_id', 'authors.id')
                ->join('categories', 'books.category_id', 'categories.id')
                ->SelectSubPrice()
                ->selectRaw('*,books.id')
                ->whereRaw('(discounts.discount_start_date <= now() and discounts.discount_end_date >= now())
                            or (discounts.discount_start_date <= now() and discounts.discount_end_date is null )')
                ->orderBy('sub_price', 'desc')
                ->State()
                ->limit(10)
                ->get();
        return $books;
    }
    public function recommended(){
        $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                ->join('authors', 'books.author_id', 'authors.id')
                ->join('categories', 'books.category_id', 'categories.id')
                ->selectRaw('*,books.id')
                ->SelectSubPrice()
                ->State()
                ->join(DB::raw("(select books.id, avg(reviews.rating_start::int)::float as avg_star
                                from books 
                                join reviews
                                on books.id = reviews.book_id
                                GROUP BY books.id ) as c"
                            ),
                                function($join)
                                {
                                    $join->on('c.id','=','books.id');
                                }
                    )
                ->orderBy('avg_star', 'desc')
                ->orderBy('sub_price','asc')
                ->limit(8)
                ->get();
        return $books;
    }
    public function popular(){
        $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                ->join('authors', 'books.author_id', 'authors.id')
                ->selectRaw('*,books.id')
                ->join('categories', 'books.category_id', 'categories.id')
                ->SelectReviewsCount()
                ->SelectSubPrice()
                ->State()
                ->orderBy('reviews_count', 'desc')
                ->limit(8)
                ->get();
        return $books;
    }
}

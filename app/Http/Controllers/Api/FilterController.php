<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Review;
use App\Models\Category;
use App\Models\Author;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\BookResource;


use Illuminate\Http\Request;

class FilterController extends Controller
{
    public function onsaleAuthor($pageno=5,$id=1)
    {
        $books = Book::join('discounts', 'books.id', 'discounts.book_id')
                    ->join('authors', 'books.author_id', 'authors.id')
                    ->selectRaw('*,books.id')
                    ->SelectSubPrice()
                    ->State()
                    ->whereRaw('(discounts.discount_start_date <= now() and discounts.discount_end_date >= now())
                                or (discounts.discount_start_date <= now() and discounts.discount_end_date is null )')
                    ->orderBy('sub_price', 'desc')
                    ->where("authors.id","like",$id)
                    ->paginate($pageno);
        return $books;
    }
    public function popularAuthor($pageno=5,$id=1){
        $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                    ->join('authors', 'books.author_id', 'authors.id')
                    ->selectRaw('*,books.id')
                    ->SelectSubPrice()
                    ->State()
                    ->where("authors.id","like",$id)
                    ->paginate($pageno);
            return $books;
    }
    public function booksAuthor($sort='asc',$pageno=5,$id=1){
        $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                    ->join('authors', 'books.author_id', 'authors.id')
                    ->SelectSubPrice()
                    ->selectRaw('*,books.id')
                    ->State()
                    ->orderby('sub_price',$sort)
                    ->where("authors.id","like",$id)
                    ->paginate($pageno);
        return $books;
    }

    public function onsaleCategory($pageno=5,$id=1)
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
                    ->where("categories.id","like",$id)
                    ->paginate($pageno);
        return $books;
    }
    public function popularCategory($pageno=5,$id=1){
        $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                    ->join('authors', 'books.author_id', 'authors.id')
                    ->join('categories', 'books.category_id', 'categories.id')
                    ->selectRaw('*')
                    ->SelectSubPrice()
                    ->State()
                    ->where("categories.id","like",$id)
                    ->paginate($pageno);
            return $books;
    }
    public function booksCategory($sort='asc',$pageno=5,$id=1){
        $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                    ->join('authors', 'books.author_id', 'authors.id')
                    ->join('categories', 'books.category_id', 'categories.id')
                    ->SelectSubPrice()
                    ->selectRaw('*')
                    ->State()
                    ->orderby('sub_price',$sort)
                    ->where("categories.id","like",$id)
                    ->paginate($pageno);
        return $books;
    }

    public function onsaleStar($pageno=5,$id='1')
    {
        $books = Book::join('discounts', 'books.id', 'discounts.book_id')
                    ->join('authors', 'books.author_id', 'authors.id')
                    ->selectRaw('*')
                    ->join(DB::raw("(select books.id, avg(reviews.rating_start::float) as avg_star
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
                    ->SelectSubPrice()
                    ->State()
                    ->whereRaw('discounts.discount_start_date <= now() 
                                and (discounts.discount_end_date >= now() or discounts.discount_end_date is null )')
                    ->orderBy('sub_price', 'desc')
                    ->where('c.avg_star','>=',$id)
                    ->paginate($pageno);  
        return $books;
    }
    public function popularStar($pageno=5,$id=1){
        $books = Book::join('authors', 'books.author_id', 'authors.id')
                    ->join('categories', 'books.category_id', 'categories.id')
                    ->selectRaw('*')
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
                    ->SelectSubPrice()
                    ->SelectReviewsCount()
                    ->State()
                    ->where('c.avg_star','>=',$id)
                    ->orderBy('reviews_count', 'desc')
                    ->orderBy('sub_price', 'asc')
                    ->paginate($pageno);
            return $books;
    }
    public function booksStar($sort='asc',$pageno=5,$id=1){
        $books = Book::leftJoin('discounts', 'books.id', 'discounts.book_id')
                    ->join('authors', 'books.author_id', 'authors.id')
                    ->join('categories', 'books.category_id', 'categories.id')
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
                    ->SelectSubPrice()
                    ->selectRaw('*')
                    ->State()
                    ->orderby('sub_price',$sort)
                    ->where('c.avg_star','>=',$id)
                    ->paginate($pageno);
        return $books;
    }

   
}

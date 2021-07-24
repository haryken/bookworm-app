<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Review;
use App\Models\Category;
use App\Models\Author;
use App\Http\Resources\ReviewResource;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function book($id){
        $books = Book::leftjoin('discounts', 'books.id', 'discounts.book_id')
                    ->join('authors', 'books.author_id', 'authors.id')
                    ->join('categories', 'categories.id', 'books.category_id')
                    ->where('books.id','like',$id)
                    ->selectRaw('*')
                    ->SelectAvgStar()
                    ->SelectSubPrice()
                    ->SelectReviewsCount()
                    ->State()
                    ->get();
        return $books;

    }
    public function review($id,$star='all',$pageno=2,$sort='desc'){
        if($star == 'all'){
            $books = Review::where('reviews.book_id','=',$id)
                        ->orderby('reviews.review_date',$sort)
                        ->paginate($pageno);
        return $books;
        }else{
            $books = Review::where('reviews.rating_start','like',$star)
                        ->where('reviews.book_id','=',$id)
                        ->orderby('reviews.review_date',$sort)
                        ->paginate($pageno);
        return $books;
        }
        

    }
    public function categories(){
        $categories = Category::all();
        return $categories;
    }
    public function authors(){
        $authors = Author::all();
        return $authors;
    }
    public function reviews(Request $request){
        $validatedData = $request->validate([
            'review_title' => 'required|max:255',
            'review_details' => 'required',
            'rating_start' => 'required',
            'book_id' => 'required'
        ]);
        if($validatedData){
            $validated_request = array_merge($request->all(), ['review_date' => now()]);
            $review = Review::create($validated_request);
            return response(new ReviewResource($review), 201);
        }

    }
}

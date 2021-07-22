<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Book extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id',
        'author_id',
        'book_title',
        'book_summary',
        'book_price',
        'book_cover_photo',
    ];
    public $timestamps = false;

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function discounts()
    {
        return $this->hasMany(Discount::class);
    }
    public function scopeSelectReviewsCount($query)
    {
        return $query->addSelect([
            'reviews_count' => Review::select(DB::raw('count(book_id)' ))
                                    ->whereColumn('book_id', 'books.id')
        ]);
    }
    public function scopeSelectSubPrice($query)
    {
        return $query->addSelect([
            'sub_price' => Discount::select(DB::raw('coalesce(max(discounts.discount_price), books.book_price)'))
                                        ->whereColumn('book_id', 'books.id')
                                        ->whereDate('discount_start_date', '<=', now())
                                        ->where(function ($query) {
                                            $query->whereDate('discount_end_date', '>=', now())
                                                    ->orWhere('discount_end_date', null);
                                        })
        ]);
    }
    public function scopeState($query)
    {
        return $query->addSelect([
            'state' => Discount::select(DB::raw('
                                                (CASE
                                                WHEN ((discounts.discount_start_date <= now() and discounts.discount_end_date >= now())
                                                or (discounts.discount_start_date <= now() and discounts.discount_end_date is null ))
                                                THEN 1
                                                ELSE 0
                                                end) AS state

                                            '))
                            ->whereColumn('book_id', 'books.id')
                        ]);
    }
    public function scopeSelectAvgStar($query)
    {
        return $query->addSelect([
            'avg_star' => Review::select(DB::raw('avg(rating_start::float)'))
                                    ->whereColumn('book_id', 'books.id')
        ]);
    }
}

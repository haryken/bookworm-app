<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable = [
        'book_id',
        'review_title',
        'review_details',
        'review_date',
        'rating_start',
    ];
    public $timestamps = false;
    public function books()
    {
        return $this->hasMany(Book::class);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    public function orders(Request $request)
    {
        $books = $request->items;
        $unavailable_book = array();
        $invalidQuantity = array();
        foreach ($books as $book) {
            if (!Book::where('id', '=', $book['book_id'])->exists()) {
                array_push($unavailable_book,array(
                    'book_id' => $book['book_id'],
                    'book_title' => $book['book_title']
                                            ));
            }
            if (!($book['quantity'] >= 1 && $book['quantity'] <= 8)) {
                array_push($invalidQuantity,array(
                    'book_id' => $book['book_id'],
                    'book_title' => $book['book_title']
                ));
            }
        }

        if ($unavailable_book || $invalidQuantity) {
            return response()->json([
                'unavailable_book' => $unavailable_book,
                'invalid_quantity' => $invalidQuantity,
                'error' => 'Unavailable books!'
            ], 400);
        }

        $order = DB::transaction(function () use ($books) {
            $total = 0;
            foreach ($books as $book) {
                $getBook = Book::where('id', $book['book_id'])->SelectSubPrice()->first();
                $price = $getBook['sub_price'];
                $order_books[] = [
                    'book_id' => $book['book_id'],
                    'price' => $price,
                    'quantity' => $book['quantity']
                ];
                $total += ($price * $book['quantity']);
            }
            $order = Order::create([
                'order_date' => now(),
                'order_amount' => $total
            ]);
            $order->order_items()->createMany($order_books);

            return $order;
        });
        return response($order, 201);
    }
}

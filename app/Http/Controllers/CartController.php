<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    // カート一覧
    public function index()
    {
        $cartItems = Cart::with('product')
            ->where('user_id', Auth::id())
            ->get();

        $total = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
            'total'     => $total,
        ]);
    }

    // カートに追加
    public function store(Request $request)
    {
        $request->validate([
            'product_id'  => 'required|exists:products,id',
            'quantity'    => 'integer|min:1',
        ]);

        $cart = Cart::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cart) {
            $cart->increment('quantity', $request->quantity ?? 1);
        } else {
            Cart::create([
                'user_id'    => Auth::id(),
                'product_id' => $request->product_id,
                'quantity'   => $request->quantity ?? 1,
            ]);
        }

        return back()->with('success', 'カートに追加しました');
    }

    // カートの削除
    public function destroy(Cart $cart)
    {
        $this->authorize('delete', $cart);
        $cart->delete();
        return back()->with('success', '削除しました');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Stripe\Stripe;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /* 
        Stripeの決済セッションを作成する
        「購入手続きへ」ボタンを押した時に呼び出される
    */
    public function checkout(Request $request)
    {
        // Stripeのシークレットキーを設定
        Stripe::setApiKey(config('services.stripe.secret'));

        // カートの商品を取得
        $cartItems = Cart::with('product')
            ->where('user_id', Auth::id())
            ->get();

        // カートが空の場合はカートページに戻る
        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index');
        }

        /**
             Stripeの決済セッションを作成 
            line_items -> 購入する商品の一覧
         */
        $lineItems = $cartItems->map(function ($item) {
            return [
                'price_data' => [
                    // 通貨 (日本円)
                    'currency' => 'jpy',
                    'product_data' => [
                        'name' => $item->product->name,
                        'images' => [$item->product->image],
                    ],
                    // 金額 (円に変換)
                    'unit_amount' => (int)($item->product->price * 150),
                ],
                'quantity' => $item->quantity,
            ];
        })->toArray();

        // Stripeの決済ページを作成
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items'           => $lineItems,
            'mode'                 => 'payment',
            // 決済成功時のリダイレクト先
            'success_url'          => route('order.success') . '?session_id={CHECKOUT_SESSION_ID}',
            // 決済キャンセル時のリダイレクト先
            'cancel_url'           => route('cart.index'),
        ]);

        // StripeのURLにリダイレクト
        return Inertia::location($session->url);
    }

    /*
        決済成功時の処理
        Stripeからsuccess_urlにリダイレクトされた時の呼び出される
    */
    public function success(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        // Stripeのセッション情報を取得
        $session = Session::retrieve($request->session_id);

        // 既に注文が作成されていたら注文完了ページを表示
        $existingOrder = Order::where('stripe_payment_id', $session->id)->first();
        if ($existingOrder) {
            return Inertia::render('Order/Success', [
                'order' => $existingOrder->load('items.product'),
            ]);
        }

        // カートの商品を取得
        $cartItems = Cart::with('product')
            ->where('user_id', Auth::id())
            ->get();

        // 合計金額を計算
        $total = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);

        /*
            注文をDBに保存
            ordersテーブルに保存
        */
        $order = Order::create([
            'user_id'           => Auth::id(),
            'total_amount'      => $total,
            'status'            => 'paid',
            'stripe_payment_id' => $session->id,
        ]);

        /*
            注文詳細をDBに保存
            order_itemsテーブルに保存
        */
        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id'   => $order->id,
                'product_id' => $item->product_id,
                'quantity'   => $item->quantity,
                'price'      => $item->product->price,
            ]);
        }

        // カートを空にする
        Cart::where('user_id', Auth::id())->delete();

        return Inertia::render('Order/Success', [
            'order' => $order->load('items.product'),
        ]);
    }
}

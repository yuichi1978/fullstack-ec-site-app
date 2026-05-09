<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// トップページ（商品一覧）
Route::get('/', [ProductController::class, 'index'])->name('home');

// 商品詳細
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

// ログイン必須ルート
Route::middleware('auth')->group(function () {

    // カート
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::delete('/cart/{cart}', [CartController::class, 'destroy'])->name('cart.destroy');

    // 注文・決済 <- 追加
    Route::post('/checkout', [OrderController::class, 'checkout'])->name('order.checkout');
    Route::get('/order/success', [OrderController::class, 'success'])->name('order.success');

    // プロフィール
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
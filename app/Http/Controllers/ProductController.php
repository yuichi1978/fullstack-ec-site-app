<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // 商品一覧 (トップページ)
    public function index(Request $request) 
    {
        $query = Product::with('category')->latest();

        // categoryパラメータがある場合は絞り込み
        if ($request->category) {
            $query->where('category_id', $request->category);
        }

        $products = $query->paginate(12);
        $categories = Category::all();

        return Inertia::render('Products/Index', [
            'products'   => $products,
            'categories' => $categories,
        ]);
    }

    // 商品詳細
    public function show(Product $product)
    {
        $product->load('category');

        $related = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();
        
        return Inertia::render('Products/Show', [
            'product' => $product,
            'related' => $related,
        ]);
    }
}

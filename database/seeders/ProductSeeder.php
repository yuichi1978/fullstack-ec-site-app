<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fake Store APIからデータ取得
        $response = Http::get('https://fakestoreapi.com/products');
        $products = $response->json();

        foreach ($products as $item) {
            // カテゴリを取得 or 作成
            $category = Category::firstOrCreate(
                ['slug' => Str::slug($item['category'])],
                ['name' => $item['category']]
            );

            // 商品を作成
            Product::create([
                'category_id'  => $category->id,
                'name'         => $item['title'],
                'description'  => $item['description'],
                'price'        => $item['price'],
                'image'        => $item['image'],
                'stock'        => rand(10, 100),
                'rating'       => $item['rating']['rate'],
                'rating_count' => $item['rating']['count'],
            ]);
        }

        $this->command->info('商品データを ' . count($products) . ' 件登録しました！');
    }
}

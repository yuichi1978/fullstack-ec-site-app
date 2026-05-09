import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import Header from "@/Components/Layout/Header";
import Footer from "@/Components/Layout/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { div } from "framer-motion/client";

// productsとcategoriesをpropsで受け取る
// (ProductControllerのindex()から渡されるデータ)
export default function Index({ products, categories }) {
    // 選択中のカテゴリIDを管理
    // 初期値は "" (すべて表示)
    const [selectedCategory, setSelectedCategory] = useState("");

    // カテゴリーボタンをクリックしたときの処理
    const filterByCategory = (categoryId) => {
        // 現在、選択中のカテゴリIdを更新する
        setSelectedCategory(categoryId);

        // Inertiaでページを再読み込み (URLにcategoryパラメーターを付ける)
        router.get("/", { category: categoryId }, { preserveState: true });
    };

    console.log("products", products);
    console.log("categories", categories);

    return (
        <>
            {/* ページタイトル (ブラウザのタブに表示) */}
            <Head title="ファッションストア" />

            <Header />

            <main>
                {/* ヒーローセクション */}
                <section className="bg-gray-100 py-60 text-center">
                    {/* キャッチコピー */}
                    <motion.p
                        className="text-[10px] sm:text-xs font-light tracking-[0.3em] text-gray-400 mb-4 uppercase"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: 0.1,
                        }}
                    >
                        NEW ARRIVAL 2026
                    </motion.p>
                    {/* メインタイトル */}
                    <motion.h1
                        className="text-5xl font-serif font-bold tracking-widest text-gray-900 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                    >
                        FASHION STORE
                    </motion.h1>
                    {/* サブテキスト */}
                    <motion.p
                        className="text-gray-500 text-lg mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                            delay: 0.3,
                        }}
                    >
                        最新のファッションアイテムをお届けします
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.4,
                        }}
                    >
                        {/* ショップボタン */}
                        <Link href="#products">
                            <button
                                className="
                                bg-gray-900 text-white px-10 py-3 text-sm tracking-widest 
                                hover:bg-gray-700 rounded-md transition-colors duration-200"
                            >
                                SHOP NOW
                            </button>
                        </Link>
                    </motion.div>
                </section>

                {/* カテゴリフィルター */}
                <section className="max-w-7xl mx-auto px-4 py-8 pt-28">
                    {/* セクションタイトル */}
                    <h2 className="text-sm font-light tracking-widest text-gray-500 mb-4 uppercase">
                        CATEGORY
                    </h2>

                    {/* カテゴリボタン一覧 */}
                    <div className="flex flex-wrap gap-3">
                        {/* 「すべて」ボタンselectedCategory === "" の時のアクティブ（黒背景） */}
                        <button
                            onClick={() => filterByCategory("")}
                            className={`
                                px-6 py-2 text-sm tracking-wider border rounded-md transition-colors duration-200
                                ${
                                    selectedCategory === ""
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "bg-white text-gray-600 border-gray-300 hover:border-gray-900"
                                }
                            `}
                        >
                            すべて
                        </button>

                        {/* カテゴリボタンをループで表示selectedCategory === category.idの時にアクティブ */}
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => filterByCategory(category.id)}
                                className={`px-6 py-2 text-sm tracking-wider rounded-md border transition-colors duration-200
                                    ${
                                        selectedCategory === category.id
                                            ? "bg-gray-900 text-white border-gray-900"
                                            : "bg-white text-gray-600 border-gray-300 hover:border-gray-900"
                                    }
                                    `}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 商品一覧 */}
                {/* id="products" -> 「SHOP NOW」ボタンを押した時にこの場所にスクロールする */}
                <section id="products" className="max-w-7xl mx-auto px-4 pb-16">
                    {/* セクションタイトル */}
                    <h2 className="text-sm font-light tracking-widest text-gray-500 mb-8 uppercase">
                        PRODUCTS
                    </h2>

                    {/* grid グリッドレイアウトでスマホ時はgrid-cols-2で2列でタブレット時は3列で表示しls:grid-cols-4はPCサイズは4列で表示gap-6でカード情報の余白を開ける指定 */}
                    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {/* products.data -> ページネーションの商品配列 */}
                        {/* map() -> 1件ずつ取り出してカードを作る */}
                        {products.data.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: (index % 4) * 0.1,
                                }}
                            >
                                <Link href={`/products/${product.id}`}>
                                    {/* group　-> 親にgroupを付けると子要素でhover状態を参照できる */}
                                    {/* overflow-hidden -> カードからはみ出た要素を隠す */}
                                    {/* hover:shadow-md -> ホバー時に影を付ける */}
                                    <Card className="group h-full flex flex-col overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                        {/* カード本文エリア */}
                                        <CardContent className="flex-1">
                                            {/* 画像エリア */}
                                            {/* aspect-square -> 縦横比を1:1に固定 */}
                                            <div className="aspect-square bg-gray-50 flex items-center justify-center p-6">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    referrerPolicy="no-referrer"
                                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>

                                            {/* テキストエリア */}
                                            <div className="p-4">
                                                {/* カテゴリ名 */}
                                                <p className="text-xs text-gray-400 tracking-wider mb-1">
                                                    {product.category?.name}
                                                </p>

                                                {/* 商品名 (長い場合は２行で切る) */}
                                                {/* line-clamp-2 -> 2行を超えたら 「...」で省力 */}
                                                <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                                                    {product.name}
                                                </p>
                                            </div>
                                        </CardContent>

                                        {/* CardFooter -> カードの下部エリア 価格・評価など固定表示したい情報を置く */}
                                        <CardFooter className="px-4 pb-4 border-none flex items-center justify-between">
                                            {/* 価格 */}
                                            <p className="font-bold text-gray-900">
                                                ${product.price}
                                            </p>

                                            {/* 評価 */}
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-400 text-xs">
                                                    ★
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {product.rating}
                                                </span>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            {/* ページネーション */}
            {/* products.links -> ページネーションのリンク配列 */}
            {/* 例：［前へ］[1][2][3][次へ] のような配列が入っている */}
            <div className="flex justify-center gap-2 mt-12 mb-16">
                {products.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url ?? "#"}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`
                px-4 py-2 text-sm border transition-colors duration-200
                ${
                    link.active
                        ? "font-bold border-b-3 border-gray-600 text-gray-600"
                        : "text-gray-400 hover:text-gray-700"
                }
                ${
                    !link.url
                        ? "opacity-40 cursor-not-allowed pointer-events-none"
                        : ""
                }
            `}
                    />
                ))}
            </div>

            <Footer />
        </>
    );
}

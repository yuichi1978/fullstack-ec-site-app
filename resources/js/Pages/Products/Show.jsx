import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Header from "@/Components/Layout/Header";
import Footer from "@/Components/Layout/Footer";

// product -> ProductControllerのshow()から渡されるデータ
// related -> 関連商品（同じカテゴリの商品）
export default function Show({ product, related }) {
    console.log("product", product);
    console.log("related", related);
    // useForm -> Inertia.jsのフォーム管理をフックカートに追加する時に必要なデータを管理する
    // product_id -> どの商品をカートに追加するか
    // quantity   -> 何個追加するか (初期値は1)
    const { data, setData, post, processing } = useForm({
        product_id: product.id,
        quantity: 1,
    });
    /* 
        カートに追加する処理
        post('/cart') -> CartControllerのstore()を呼び出す
    */

    const addToCart = () => {
        post("/cart");
    };

    return (
        <>
            <Head title={product.name} />

            <Header />

            <main className="max-w-7xl mx-auto px-4 py-12">
                {/* 
                    パンクズリスト 
                    パクズリスト -> 現在地を示すナビゲーション 
                    例： ホーム -> men's clothing -> 商品名 
                */}

                <nav className="text-sm text-gray-400 mb-8 flex items-center min-w-0">
                    <Link
                        href="/"
                        className="hover:text-gray-900 transition-colors shrink-0"
                    >
                        ホーム
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-500 truncate max-w-25 md:max-w-none">
                        {product.category?.name}
                    </span>
                    <span className="mx-2 shrink-0">/</span>
                    {/* カテゴリ名：スマホでは最大100pxで省略 */}
                    <span className="text-gray-500 truncate max-w-50 md:max-w-none md:overflow-visible">
                        {product.name}
                    </span>
                </nav>

                {/* 
                    商品メインエリア
                    md:grid-cols-2 -> PC時に左右2列　
                    左：画像 右：商品情報
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-36">
                    {/* 左側：商品画像 */}
                    <motion.div
                        className="bg-gray-50 flex items-center justify-center p-12 rounded-lg w-4/5 mx-auto md:w-full"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full max-h-96 object-contain"
                        />
                    </motion.div>

                    {/* 右側：商品情報 */}
                    <motion.div
                        className="flex flex-col justify-center"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                    >
                        {/* カテゴリ名 */}
                        <p className="text-xs tracking-wider text-gray-400 uppercase mb-2 mx-2 shrink-0">
                            {product.category?.name}
                        </p>
                        {/* 商品名 */}
                        <h1 className="text-2xl truncate md:whitespace-normal md:overflow-visible max-w-fit md:max-w-full font-bold text-gray-900 mb-4">
                            {product.name}
                        </h1>
                        {/* 評価 */}
                        {/*
                            rating  ->  平均評価 (例：4.2)
                            rating_count -> 評価数 (例：120件)
                        */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-gray-700">
                                {product.rating}
                            </span>
                            <span className="text-sm text-gray-400">
                                ({product.rating_count}件のレビュー)
                            </span>
                        </div>

                        {/* 価格 */}
                        <p className="text-3xl font-bold tracking-wider text-gray-900 mb-8">
                            {product.price}
                        </p>

                        {/* 在庫状況 */}
                        {/*
                            product.stock > 0 -> 在庫あり (緑)
                            product.stock === 0 -> 在庫なし (赤)
                        */}
                        <p
                            className={`text-sm mb-6 font-light ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
                        >
                            {product.stock > 0
                                ? `在庫あり（残り${product.stock}点）`
                                : "在庫なし"}
                        </p>

                        {/* 数量選択 */}
                        {/* 
                            数量を1～10まで選べるセレクトボックス
                            onChange -> 選択した値を data.quantityに反映
                        */}
                        <div className="flex items-center gap-4 mb-6">
                            <label className="text-sm text-gray-600">
                                数量
                            </label>
                            <select
                                value={data.quantity}
                                onChange={(e) =>
                                    setData(
                                        "quantity",
                                        parseInt(e.target.value),
                                    )
                                }
                                className="
                                    border border-gray-300 px-4 py-2 text-sm text-gray-900 
                                    focus:outline-none focus:border-gray-900"
                            >
                                {/* 
                                    Array.from({ length: 10 } -> [1,2,3...10]の配列を作る
                                    _, i -> _ は使わない値・i はインデックス (0~9)
                                    i + 1 -> 1~10に変換
                                 */}
                                {Array.from(
                                    { length: 10 },
                                    (_, i) => i + 1,
                                ).map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* カートに追加ボタン */}
                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={addToCart}
                                disabled={processing || product.stock === 0}
                                className="w-full h-12 text-base tracking-widest cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                            >
                                {processing ? "追加中..." : "カートに追加"}
                            </Button>

                            {/* ログインしていない場合のメッセージ */}
                            <p className="text-xs text-center text-gray-400">
                                カートに追加するには
                                <Link
                                    href="/login"
                                    className="underline hover:text-gray-900 mx-1"
                                >
                                    ログイン
                                </Link>
                                が必要です
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* 追加コード */}
                <div className="border-t border-gray-200 mt-16 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* 左側：商品説明 (下からフワッと) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <h2 className="text-sm font-bold trackingw-widest text-gray-900 mb-6">
                                DESCRIPTION
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </motion.div>

                        {/* 右側：評価 (下からフワッと・少し遅れてアニメーション) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: 0.2,
                            }}
                        >
                            <h2 className="text-sm font-bold tracking-widest text-gray-900 mb-6">
                                RATING
                            </h2>

                            {/* 評価の大きな数字 */}
                            <div className="flex items-end gap-3 mb-4">
                                <span className="text-6xl font-bold text-gray-900">
                                    {product.rating}
                                </span>
                                <div className="pb-2">
                                    <span className="text-yellow-400 text-xl">
                                        ★★★★★
                                    </span>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {product.rating_count}件のレビュー
                                    </p>
                                </div>
                            </div>

                            {/* 評価バー */}
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div
                                        key={star}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="text-xs text-gray-500 w-4">
                                            {star}
                                        </span>
                                        <span className="text-yellow-400 text-xs">
                                            ★
                                        </span>
                                        <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-yellow-400 h-full rounded-full"
                                                style={{
                                                    width:
                                                        star ===
                                                        Math.round(
                                                            product.rating,
                                                        )
                                                            ? "60%"
                                                            : star >
                                                                Math.round(
                                                                    product.rating,
                                                                )
                                                              ? "10%"
                                                              : "20%",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 関連商品セクション */}

                {/*
                    related -> ProductControllerのshow()から渡される
                     同じカテゴリの商品 (最大4件)
                */}
                {related.length > 0 && (
                    <div className="border-t border-gray-200 mt-16 pt-16">
                        {/* セクションタイトル */}
                        <h2 className="text-sm font-bold tracking-widest text-gray-900 mb-8">
                            RELATED PRODUCTS
                        </h2>
                        {/* 
                            grid-cols-2 -> スマホは2列 
                            md:grid-cols-4 -> PCは4列
                        */}
                        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {related.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/products/${item.id}`}
                                >
                                    <Card
                                        className="
                                            group overflow-hidden border border-gray-200 hover:shadow-md 
                                            transition-shadow duration-300"
                                    >
                                        <CardContent className="p-0">
                                            {/* 画像エリア */}
                                            <div className="h-48 bg-gray-50 flex items-center justify-center w-full rounded-t-lg p-6">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    referrerPolicy="no-referrer"
                                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>

                                            {/* テキストエリア */}
                                            <div className="p-4 w-full">
                                                {/* カテゴリ名 */}
                                                <p className="text-xs font-medium text-gray-800 line-clamp-2 min-h-10">
                                                    {item.category?.name}
                                                </p>

                                                {/* 商品名 */}
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {item.name}
                                                </p>
                                            </div>
                                        </CardContent>

                                        {/* 価格・評価 */}
                                        <CardFooter className="px-4 pb-4 flex items-center justify-between border-none">
                                            <p className="font-bold text-gray-900">
                                                ${item.price}
                                            </p>
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-400 text-xs">
                                                    ★
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {item.rating}
                                                </span>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
}

import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/Components/Layout/Header";
import Footer from "@/Components/Layout/Footer";

/*
    cartItems -> カートに入っている商品一覧
    total     -> 合計金額
*/

export default function Index({ cartItems, total }) {
    const { post, processing } = useForm();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    /*
        isCheckingOut -> 購入手続き中かどうかを判定してから
        trueになるとアニメーションが表示される
    */

    /*
        カートから削除する処理
        router.delete() -> CartControllerのdestory()を呼び出す
    
    */
    const removeItem = (cartId) => {
        router.delete(`/cart/${cartId}`);
    };

    /**
         購入手続きの処理
        1. アニメーションを表示
        2. 1.5秒後にStripeにリダイレクト 
     */

    const checkout = () => {
        // アニメーション開始
        setIsCheckingOut(true);

        // 1.5秒後にStripeにリダイレクト
        setTimeout(() => {
            post("/checkout");
        }, 1500);
    };

    console.log("cart_cartItems", cartItems);
    console.log("cart_total", total);

    return (
        <>
            <Head title="カート" />

            {/*
                AnimatePresence -> コンポーネントの
                追加・削除時にアニメーションを適用する
            */}
            <AnimatePresence>
                {isCheckingOut && (
                    /*
                        オーバーレイ
                        画面全体を覆う半透明の黒背景
                        position: fixed -> スクロールしても固定
                    */
                    <motion.div
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Lottileアニメーション */}
                        <DotLottieReact
                            src="/animations/shopping cart buy now button animation.json"
                            loop
                            autoplay
                            style={{
                                width: 200,
                                height: 200,
                                objectFit: "contain",
                            }}
                        />
                        {/* <Player
                            autoplay
                            loop
                            src="https://lottie.host/embed/shopping-cart-buy-now-button-animation-FEjx38dSUq/FEjx38dSUq.json"
                            style={{ width: 200, height: 200 }}
                        /> */}

                        {/* テキスト */}
                        <motion.p
                            className="text-sm tracking-widest text-gray-600 mt-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            決済ページに移動します...
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            <Header />

            <main className="max-w-7xl mx-auto px-4 py-12 min-h-[calc(100vh-300px)] flex flex-col">
                {/* ページタイトル */}
                <motion.h1
                    className="text-sm font-bold tracking-widest text-gray-900 mb-8
                
                "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    SHOPPING CART
                </motion.h1>

                {/* 
                    カートが空の場合と商品がある場合で表示を切り替える
                */}
                {cartItems.length === 0 ? (
                    /* カートが空の場合の処理 */
                    <motion.div
                        className="text-center py-24"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-gray-400 text-sm mb-6">
                            カートに商品がありません
                        </p>
                        <Link href="/">
                            <button
                                className="
                                    bg-gray-900 text-white px-8 py-3 text-sm tracking-widest 
                                    hover:bg-gray-700 transition-colors duration-200"
                            >
                                ショッピングを続ける
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    /* 
                        商品があるとき 
                        左：商品一覧 右：合計金額
                        md:grid-cols-3 -> PC時に3列
                        左が2列分・右が1列分
                    */

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-36">
                        {/* 左側：商品一覧 (修正：col-span-2) */}
                        <div className="md:col-span-2 space-y-4">
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <Card className="border border-gray-200">
                                        <CardContent className="p-4">
                                            {/* スマホ：縦並び / PC：横並び・上揃え */}
                                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                                {/* 商品画像 */}
                                                <div className="w-24 h-24 bg-gray-50 flex items-center justify-center p-2 shrink-0 rounded">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        referrerPolicy="no-referrer"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>

                                                {/* 情報エリア */}
                                                <div className="flex flex-col flex-1 w-full gap-2">
                                                    {/* 1段目：商品名 + 単価 */}
                                                    <div className="flex justify-between items-start gap-4">
                                                        <p className="text-sm font-medium text-gray-900 line-clamp-2 md:text-base">
                                                            {item.product.name}
                                                        </p>
                                                        <p className="text-sm font-bold text-gray-900 shrink-0">
                                                            $
                                                            {item.product.price}
                                                        </p>
                                                    </div>

                                                    {/* 2段目：数量 + 小計 (PCでは少し余白を広げると見やすい) */}
                                                    <div className="flex justify-between items-center border-t border-gray-100 pt-2 mt-auto">
                                                        <p className="text-sm text-gray-600">
                                                            数量：
                                                            {item.quantity}
                                                        </p>
                                                        <p className="text-sm font-bold text-gray-900 md:text-base">
                                                            $
                                                            {(
                                                                item.product
                                                                    .price *
                                                                item.quantity
                                                            ).toFixed(2)}
                                                        </p>
                                                    </div>

                                                    {/* 削除ボタン */}
                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={() =>
                                                                removeItem(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-200 underline"
                                                        >
                                                            削除
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* 右側：合計金額 (Stickyで追従) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="h-fit sticky top-16" // Stickyを効かせるために必要
                        >
                            <Card className="border border-gray-200">
                                <CardContent className="p-6">
                                    <h2 className="text-sm font-bold tracking-widest text-gray-900 mb-6">
                                        ORDER SUMMARY
                                    </h2>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>小計</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>送料</span>
                                            <span className="text-green-600 font-medium">
                                                無料
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 my-4" />

                                    <div className="flex justify-between font-bold text-gray-900 mb-6 text-lg">
                                        <span>合計</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>

                                    <Button
                                        onClick={checkout}
                                        disabled={processing || isCheckingOut}
                                        className="w-full h-12 tracking-widest text-sm font-bold shadow-lg hover:shadow-none transition-all"
                                    >
                                        {isCheckingOut
                                            ? "処理中..."
                                            : "購入手続きへ"}
                                    </Button>

                                    <Link
                                        href="/"
                                        className="block text-center mt-4 text-xs text-gray-400 hover:text-gray-900 transition-colors underline"
                                    >
                                        ショッピングを続ける
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
}

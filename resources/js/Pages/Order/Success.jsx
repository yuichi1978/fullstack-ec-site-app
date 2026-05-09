import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import Header from "@/Components/Layout/Header";
import Footer from "@/Components/Layout/Footer";

export default function Success({ order }) {
    console.log("Success_order", order);

    return (
        <>
            <Head title="注文完了" />

            <Header />

            <main className="max-w-3xl mx-auto px-4 py-24  text-center min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
                {/* 完了アイコン */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                    <span className="text-white text-2xl">✓</span>
                </motion.div>

                {/* タイトル */}
                <motion.h1
                    className="text-2xl font-bold tracking-widest text-gray-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    ご注文ありがとうございます
                </motion.h1>

                {/* 注文番号 */}
                <motion.p
                    className="text-sm text-gray-400 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    注文番号：{order.id}
                </motion.p>

                {/* 注文明細 */}
                <motion.div
                    className="border border-gray-200 text-left mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {order.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-4 border-b border-gray-100 last:border-none"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    referrerPolicy="no-referrer"
                                    className="w-12 h-12 object-contain bg-gray-50 p-1"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                        {item.product.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        数量：{item.quantity}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm font-bold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}

                    {/* 合計 */}
                    <div className="flex justify-between p-4 bg-gray-50">
                        <span className="text-sm font-bold text-gray-900">
                            合計
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                            ${order.total_amount}
                        </span>
                    </div>
                </motion.div>

                {/* ホームに戻るボタン */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <Link href="/">
                        <button className="bg-gray-900 text-white px-10 py-3 text-sm trancking-widest hover:bg-gray-700 transition-colors duration-200">
                            ショッピングを続ける
                        </button>
                    </Link>
                </motion.div>
            </main>

            <Footer />
        </>
    );
}

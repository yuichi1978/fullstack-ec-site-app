import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";

// リンクデータを配列で管理 (追加・削除が簡単)
const footerLinks = [
    {
        title: "ショップ",
        links: [
            { label: "商品一覧", href: "/" },
            { label: "新着商品", href: "/" },
            { label: "セール", href: "/" },
        ],
    },
    {
        title: "アカウント",
        links: [
            { label: "ログイン", href: "/login" },
            { label: "新規登録", href: "/register" },
            { label: "注文履歴", href: "/orders" },
        ],
    },
    {
        title: "サポート",
        links: [
            { label: "お問い合わせ", href: "/" },
            { label: "返品について", href: "/" },
            { label: "配送について", href: "/" },
        ],
    },
    {
        title: "会社情報",
        links: [
            { label: "会社概要", href: "/" },
            { label: "採用情報", href: "/" },
            { label: "プレス", href: "/" },
        ],
    },
    {
        title: "お支払い",
        links: [
            { label: "クレジットカード", href: "/" },
            { label: "支払い方法", href: "/" },
            { label: "セキュリティ", href: "/" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-gray-500 text-white">
            {/* メインエリア */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                    {/* 左側：ブランドエリア (4列中1列分) */}
                    <motion.div
                        className="cols-span-1"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeInout" }}
                        viewport={{ once: true }}
                    >
                        {/* ブランド名 */}
                        <Link href="/">
                            <span className="text-2xl font-serif font-bold tracking-widest">
                                FASHION STORE
                            </span>
                        </Link>
                        {/* キャッチコピー */}
                        <p className="mt-4 text-gray-400 text-sm">
                            最新のファッションの
                            <br />
                            オンラインストア
                        </p>
                    </motion.div>

                    {/* 右側：リンク3列 footerLinks配列をmap()でループして表示index = 0,1,2 の順番 */}
                    {footerLinks.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: index * 0.1,
                            }}
                            viewport={{ once: true }}
                        >
                            {/* セクションタイトル */}
                            <h3 className="text-sm font-bold trancking-widest text-white mb-4">
                                {section.title}
                            </h3>

                            {/* リンクリスト */}
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 区切り線 */}
            <div className="border-t border-gray-400" />

            {/* コピーライト */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
            >
                <p className="text-gray-300 text-sm">
                    © 2026 Fashion Store. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <Link
                        href="/"
                        className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                    >
                        プライバシーポリシー
                    </Link>
                    <Link
                        href="/"
                        className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                    >
                        利用規約
                    </Link>
                </div>
            </motion.div>
        </footer>
    );
}

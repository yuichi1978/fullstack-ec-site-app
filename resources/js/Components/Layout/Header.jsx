import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Sling as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";

const menuItems = [
    { label: "ホーム", href: "/" },
    { label: "カート", href: "/cart" },
    { label: "ログイン", href: "/login" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* ロゴ */}
                <Link href="/">
                    <span className="font-serif text-xl font-bold tracking-wider text-gray-900">
                        FASHION STORE
                    </span>
                </Link>

                {/* PC用ナビ */}
                <nav className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" asChild>
                        <Link href="/">ホーム</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                        <Link href="/cart">カート</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/login">ログイン</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">新規登録</Link>
                    </Button>
                </nav>

                {/* スマホ用 */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <div>
                                <Hamburger
                                    toggled={isOpen}
                                    toggle={setIsOpen}
                                    size={24}
                                    color="#111827"
                                />
                            </div>
                        </SheetTrigger>

                        {/* side="left" で左からスライド */}
                        <SheetContent
                            side="left"
                            className="w-72 bg-white px-0"
                        >
                            <SheetHeader className="px-6 py-4 border-b border-gray-100">
                                <SheetTitle className="text-left text-lg font-serif tracking-widest text-gray-900">
                                    FASHION STORE
                                </SheetTitle>
                            </SheetHeader>

                            <nav className="flex flex-col px-4 mt-6 gap-1">
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.4,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-base font-medium text-gray-900 hover:bg-gray-100 h-12"
                                            >
                                                {item.label}
                                            </Button>
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* 新規登録は目立つボタンとして分ける */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: menuItems.length * 0.1 + 0.1,
                                        duration: 0.4,
                                        ease: "easeOut",
                                    }}
                                    className="mt-4 px-0"
                                >
                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Button className="w-full h-12 text-base tracking-wider">
                                            新規登録
                                        </Button>
                                    </Link>
                                </motion.div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

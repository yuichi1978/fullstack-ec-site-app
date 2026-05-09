import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export default function Login() {
    /* 
        useForm  -> Inertaiのフォーム管理
        email    -> メールアドレス
        password -> パスワード
        remember -> ログイン状態を保持するか
    */

    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    /*
        フォーム送信処理
        post("/login") -> AuthenticatedSessionControllerのstore()を呼び出す
    
    */

    const submit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <>
            <Head title="ログイン" />

            {/* 
                全画面を使ったレイアウト
                min-h-screen -> 画面の高さいっぱいに広げる
            */}
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                {/*
                    motion.div -> ページ読み込み時にアニメーションでしたから
               */}
                <motion.div
                    className="w-full max-w-md px-4 md:px-0"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Card className="border border-gray-200 shadow-sm">
                        {/* カードヘッダー */}
                        <CardHeader className="text-center pt-10 pb-6">
                            {/* ロゴ */}
                            <Link href="/">
                                <span className="text-2xl font-serif tracking-widest text-gray-900">
                                    FASHION STORE
                                </span>
                            </Link>

                            <CardTitle className="text-lg font-medium text-gray-700 mt-4">
                                ログイン
                            </CardTitle>

                            <CardDescription className="text-sm text-gray-400">
                                アカウントにログインしてください
                            </CardDescription>
                        </CardHeader>

                        {/* カード本文：フォーム */}
                        <CardContent className="px-8">
                            <form onSubmit={submit} className="space-y-5">
                                {/* メールアドレス */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-sm text-gray-700"
                                    >
                                        メールアドレス
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="example@email.com"
                                        className="h-11 border-gray-300 focus:hover-gray-900"
                                        autoComplete="email"
                                    />
                                    {/* 
                                        errors.email -> バリデーションエラーメッセージ
                                        入力が間違えている時に表示される
                                    */}
                                    {errors.email && (
                                        <p className="text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* パスワード */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm text-gray-700"
                                        >
                                            パスワード
                                        </Label>
                                        {/* パスワードを忘れた場合のリンク */}
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
                                        >
                                            パスワードをお忘れですか？
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="パスワードを入力"
                                        className="h-11 border-gray-300 focus:border-gray-900"
                                        autoComplete="current-password"
                                    />
                                    {errors.password && (
                                        <p className="text-xs text-red-500">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* ログイン状態を保持 */}
                                <div className="flex items-center gap-2">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked,
                                            )
                                        }
                                        className="w-4 h-4 border-gray-300"
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm text-gray-600 cursor-pointer"
                                    >
                                        ログイン状態を保持する
                                    </Label>
                                </div>

                                {/* ログインボタン */}
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-11 tracking-widest text-sm hover:bg-gray-600 transition-colors"
                                >
                                    {processing ? "ログイン中" : "ログイン"}
                                </Button>
                            </form>
                        </CardContent>

                        {/* カードフッター：新規登録リンク */}
                        <CardFooter className="justify-center pb-10 pt-4 border-none">
                            <p className="text-sm text-gray-400">
                                アカウントをお持ちでない方は
                                <Link
                                    href="/register"
                                    className="text-gray-900 font-medium underline hover:text-gray-600 transition-colors ml-1"
                                >
                                    新規登録
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </>
    );
}

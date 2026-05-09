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

export default function Register() {
    /*
        useForm -> Inertiaのフォーム管理
        name -> ユーザー名
        email -> メールアドレス
        password -> パスワード
        password_confirmation -> パスワード確認
    */
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    /*
    フォーム送信処理
    post("/register") -> RegisterUserControllerのstore()を呼び出す
   */
    const submit = (e) => {
        // ページのリロードを防ぐ
        e.preventDefault();
        post("/register");
    };

    return (
        <>
            <Head title="新規登録" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                {/*
                    ログインページと同じアニメーション
                    下からフワッと出現
                */}
                <motion.div
                    className="w-full max-w-md px-4 md:px-0"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Card className="border border-gray-200 shadow-sm p-0">
                        {/* カードヘッダー */}
                        <CardHeader className="text-center pt-10 pb-4">
                            {/* ロゴ */}
                            <Link href="/">
                                <span className="text-2xl font-bold tracking-widest text-gray-900">
                                    FASHION STORE
                                </span>
                            </Link>

                            <CardTitle className="text-lg font-medium text-gray-700 mt-4">
                                新規登録
                            </CardTitle>

                            <CardDescription className="text-sm text-gray-400">
                                アカウントを作成してください
                            </CardDescription>
                        </CardHeader>

                        {/* カード本文：フォーム */}
                        <CardContent className="px-8">
                            <form onSubmit={submit} className="space-y-5">
                                {/* ユーザー名 */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="name"
                                        className="text-sm text-gray-700"
                                    >
                                        ユーザー名
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="山田 太郎"
                                        className="h-11 border-gray-300 focus:border-gray-900"
                                        autoComplete="name"
                                    />
                                    {/*
                                        errors.name -> バリデーションエラー
                                        名前が未入力の時に表示
                                    */}
                                    {errors.name && (
                                        <p className="text-sm text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

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
                                        className="h-11 border-gray-300 focus:border-gray-900"
                                        autoComplete="email"
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* パスワード */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm text-gray-700"
                                    >
                                        パスワード
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="8文字以上で入力"
                                        className="h-11 border-gray-300 focus:border-gray-900"
                                        autoComplete="new-password"
                                    />
                                    {errors.password && (
                                        <p className="text-xs text-red-500">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* パスワード確認 */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password_confirmation"
                                        className="text-sm text-gray-700"
                                    >
                                        パスワード（確認）
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="もう一度入力してください"
                                        className="h-11 border-gray-300 focus:border-gray-900"
                                        autoComplete="new-password"
                                    />
                                    {/*
                                        password_confirmation →
                                        パスワードと一致しない時にエラーを表示
                                    */}
                                    {errors.password_confirmation && (
                                        <p className="text-xs text-red-500">
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>
                                {/* 利用規約への同意 */}
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    登録することで
                                    <Link
                                        href="/"
                                        className="underline hover:text-gray-900 transition-colors mx-1"
                                    >
                                        利用規約
                                    </Link>
                                    および
                                    <Link
                                        href="/"
                                        className="underline hover:text-gray-900 transition-colors mx-1"
                                    >
                                        プライバシーポリシー
                                    </Link>
                                    に同意したものとみなします。
                                </p>

                                {/* 登録ボタン */}
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-11 tracking-widest text-sm hover:bg-gray-600"
                                >
                                    {processing
                                        ? "登録中..."
                                        : "アカウントを作成"}
                                </Button>
                            </form>
                        </CardContent>

                        {/* カードフッター：ログインリンク */}
                        <CardFooter className="justify-center pb-2 pt-2 border-none">
                            <p className="text-sm text-gray-400">
                                すでにアカウントをお持ちの方は
                                <Link
                                    href="/login"
                                    className="text-gray-900 font-medium underline hover:text-gray-600 transition-colors ml-1"
                                >
                                    ログイン
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </>
    );
}

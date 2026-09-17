"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useActionState } from "react"
import { authenticate } from "@/lib/actions/authenticate"
import Link from "next/link"


export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    )
    return (
        <Card className="w-full py-6 [--card-spacing:1.5rem]">
            <CardHeader>
                <CardTitle>
                    ログイン
                </CardTitle>
                <CardDescription>
                    メールアドレスとパスワードを入力してください
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-5">
                    <div>
                        <Label htmlFor="email">
                            メールアドレス
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@example.com"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">
                            パスワード
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="パスワードは8文字以上"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isPending} className="w-full">
                        {isPending ? "ログイン中..." : "ログイン"}
                    </Button>
                    {errorMessage && (
                        <p className="text-sm text-red-500">
                            {errorMessage}
                        </p>
                    )}
                    <p className="text-center text-sm text-muted-foreground">初めての方は <Link href="/register" className="font-semibold text-primary underline">新規登録</Link></p>
                </form>
            </CardContent>
        </Card>
    )
}

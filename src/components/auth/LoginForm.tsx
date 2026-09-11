"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useActionState } from "react"
import { authenticate } from "@/lib/actions/authenticate"


export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    )
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    ログイン
                </CardTitle>
                <CardDescription>
                    メールアドレスとパスワードを入力してください
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} >
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
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "ログイン中..." : "ログイン"}
                    </Button>
                    {errorMessage && (
                        <p className="text-sm text-red-500">
                            {errorMessage}
                        </p>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}

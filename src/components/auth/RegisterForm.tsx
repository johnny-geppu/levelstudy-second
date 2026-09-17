'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState } from "react";
import { createUser } from "@/lib/actions/createUser";
import Link from "next/link";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    createUser,
    {
      success: false,
      errors: {},
    }
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>ユーザー登録</CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-4">

          <div>
            <Label htmlFor="name">名前</Label>
            <Input
              id="name"
              type="text"
              name="name"
              required
            />

            {state.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.name.join(",")}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">
              メールアドレス
            </Label>

            <Input
              id="email"
              type="email"
              name="email"
              required
            />

            {state.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.email.join(",")}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">
              パスワード
            </Label>

            <Input
              id="password"
              type="password"
              name="password"
              required
            />

            {state.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.password.join(",")}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">
              パスワード(確認)
            </Label>

            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
            />

            {state.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.confirmPassword.join(",")}
              </p>
            )}
          </div>

          {state.errors.form && <p role="alert" className="text-sm text-red-500">{state.errors.form.join("、")}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "登録中..." : "登録"}
          </Button>
          <Link href="/login" className="block text-sm underline">登録済みの方はログイン</Link>

        </form>
      </CardContent>
    </Card>
  );
}

//auth.configの内容を展開する 
// Credentials(認証の種類)を設定できるようにする

// authenticate = 実際にログインする
// auth = ログイン情報が正しいか確認
// middleware = ページへのアクセス時にログイン状態を確認
// auth.config = ログイン状態に応じたアクセスルール

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import bcryptjs from "bcryptjs";

// メールアドレスからDB内のユーザーを取得する
async function getUser(email: string) {
    return await prisma.user.findUnique({
        where: { email: email },
    });
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,

    // 使用するログイン方法
    providers: [
        // メールアドレス・パスワードによるログイン
        Credentials({
            async authorize(credentials) {
                // emailとpasswordの入力形式をZodでチェック
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(8),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const user = await getUser(email);
                    // ユーザーが存在しなければログイン失敗
                    if (!user) return null;

                    const passwordMatch = await bcryptjs.compare(password, user.password);

                    if (passwordMatch) return user;
                }

                // 入力不正・パスワード不一致ならログイン失敗
                return null;
            },
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
        //sessionはname, emailのみ token.subにidが含まれているので 
        // session.user.idで取得できるようにしておく
        async session({ session, token }) {
            if (session.user) {
                session.user.id = (token.id || token.sub || '') as string;
                session.user.name = token.name ?? '';
                session.user.email = token.email ?? '';
            }
            return session;
        }
    }
});

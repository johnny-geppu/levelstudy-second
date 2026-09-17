import z from "zod";

export const registerSchema = z.object({
    name: z.string().trim().min(1, "名前を入力してください"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z.string().min(1,"パスワードを入力してください").min(8, "パスワードは8文字以上で入力してください"),
    confirmPassword: z.string({ required_error: "確認用パスワードを入力してください" })
    .min(1, "確認用パスワードを入力してください")
}).refine((data) => data.password ===data.confirmPassword,{
    message: "パスワードと確認用パスワードが一致しません",
    path: ["confirmPassword"], // エラーを表示するフィールドを指定
})

import z from "zod";

export const skillSchema = z.object({
    title: z.string().min(1, { message: "タイトルは必須です" })
        .max(20, { message: "タイトルは20文字以内で入力してください" }),
})
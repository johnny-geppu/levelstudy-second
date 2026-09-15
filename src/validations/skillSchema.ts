import z from "zod";

export const skillSchema = z.object({
    title: z.string().trim().min(1, { message: "タイトルは必須です" })
        .max(20, { message: "タイトルは20文字以内で入力してください" }),
    isPublic: z.enum(["private", "public"], {
        errorMap: () => ({ message: "公開・非公開を選択してください" }),
    }).transform((value) => value === "public"),
})

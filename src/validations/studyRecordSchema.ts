import { z } from "zod";
import { getJapanDate } from "../lib/studyDate";

export const studyRecordSchema = z.object({
    studiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "学習日を入力してください")
        .refine((value) => {
            const date = new Date(`${value}T00:00:00+09:00`);
            return !Number.isNaN(date.getTime()) && getJapanDate(date) === value;
        }, "存在する日付を入力してください")
        .refine((value) => value <= getJapanDate(), "未来の日付は指定できません")
        // 日付だけの入力を日本時間の午前0時として保存する。
        .transform((value) => new Date(`${value}T00:00:00+09:00`)),
    minutes: z.coerce.number().int("時間は整数で入力してください")
        .min(1, "時間は1分以上で入力してください")
        .max(1440, "1件の学習時間は1440分以内で入力してください"),
    content: z.string().trim().min(1, "学習内容を入力してください")
        .max(2000, "学習内容は2000文字以内で入力してください"),
});

"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { studyRecordSchema } from "@/validations/studyRecordSchema";
import { revalidatePath } from "next/cache";

type ActionState = {
    success?: boolean;
    errors?: { studiedAt?: string[]; minutes?: string[]; content?: string[]; form?: string[] };
};

export async function updateStudyRecord(
    recordId: string,
    prevState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return { errors: { form: ["ログインしてください"] } };

    const result = studyRecordSchema.safeParse({
        studiedAt: formData.get("studiedAt"),
        minutes: formData.get("minutes"),
        content: formData.get("content"),
    });
    if (!result.success) return { errors: result.error.flatten().fieldErrors };

    let skillId: string;
    try {
        // 記録の所有者は、関連するスキルを通して更新時にも確認する。
        const record = await prisma.studyRecord.update({
            where: { id: recordId, skill: { userId, archived: null } },
            data: result.data,
            select: { skillId: true },
        });
        skillId = record.skillId;
    } catch (error) {
        console.error("学習記録の更新に失敗しました", error);
        return { errors: { form: ["更新できませんでした。記録が利用可能か確認して再度お試しください。"] } };
    }

    revalidatePath(`/dashboard/skills/${skillId}`);
    revalidatePath("/dashboard");
    revalidatePath("/explore");
    return { success: true };
}

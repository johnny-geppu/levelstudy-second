"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { studyRecordSchema } from "@/validations/studyRecordSchema";
import { revalidatePath } from "next/cache";

type ActionState = {
    success?: boolean;
    errors?: { studiedAt?: string[]; minutes?: string[]; content?: string[]; form?: string[] };
};

export async function createStudyRecord(
    skillId: string,
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

    try {
        // 更新条件にも所有者を含め、他人のスキルへの記録を防ぐ。
        await prisma.skill.update({
            where: { id: skillId, userId, archived: null },
            data: { record: { create: result.data } },
        });
    } catch (error) {
        console.error("学習記録の追加に失敗しました", error);
        return { errors: { form: ["記録を追加できませんでした。スキルが利用可能か確認して再度お試しください。"] } };
    }

    revalidatePath(`/dashboard/skills/${skillId}`);
    revalidatePath("/dashboard");
    revalidatePath("/explore");
    return { success: true };
}

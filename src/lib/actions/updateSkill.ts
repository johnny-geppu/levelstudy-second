"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { skillSchema } from "@/validations/skillSchema";
import type { SkillActionState } from "@/types/skillActionState";
import { revalidatePath } from "next/cache";

export async function updateSkill(
    skillId: string,
    prevState: SkillActionState,
    formData: FormData,
): Promise<SkillActionState> {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return { success: false, errors: { form: ["ログインしてください。"] } };
    if (typeof skillId !== "string" || !skillId) {
        return { success: false, errors: { form: ["スキルを指定してください。"] } };
    }

    const result = skillSchema.safeParse({
        title: formData.get("title"),
        isPublic: formData.get("isPublic"),
    });
    if (!result.success) {
        return { success: false, errors: result.error.flatten().fieldErrors };
    }

    try {
        await prisma.skill.update({
            where: { id: skillId, userId, archived: null },
            data: result.data,
        });
    } catch (error) {
        console.error("スキルの更新に失敗しました", error);
        return { success: false, errors: { form: ["更新できませんでした。スキルが利用可能か確認してください。"] } };
    }

    revalidatePath(`/dashboard/skills/${skillId}`);
    revalidatePath("/dashboard");
    // 非公開に戻した場合も、公開一覧から取り除くため再検証する。
    revalidatePath("/explore");
    return { success: true };
}

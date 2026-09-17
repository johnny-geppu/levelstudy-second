"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ArchiveResult = { success: true } | { success: false; error: string };

export async function setSkillArchived(skillId: string, archive: boolean): Promise<ArchiveResult> {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return { success: false, error: "ログインしてください。" };
    if (typeof skillId !== "string" || !skillId || typeof archive !== "boolean") {
        return { success: false, error: "操作の指定が正しくありません。" };
    }

    try {
        await prisma.skill.update({
            // 所有者と変更前の状態を確認し、履歴や公開設定には触れない。
            where: { id: skillId, userId, archived: archive ? null : { not: null } },
            data: { archived: archive ? new Date() : null },
        });
    } catch (error) {
        console.error("アーカイブ状態の変更に失敗しました", error);
        return { success: false, error: "変更できませんでした。ページを再読み込みしてスキルの状態を確認してください。" };
    }

    revalidatePath(`/dashboard/skills/${skillId}`);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/archived");
    revalidatePath("/explore");
    return { success: true };
}

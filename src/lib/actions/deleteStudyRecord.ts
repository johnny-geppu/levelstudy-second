"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type DeleteResult = { success: true } | { success: false; error: string };

export async function deleteStudyRecord(recordId: string): Promise<DeleteResult> {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return { success: false, error: "ログインしてください。" };
    if (typeof recordId !== "string" || !recordId) {
        return { success: false, error: "削除する記録を指定してください。" };
    }

    let skillId: string;
    try {
        // 表示時だけでなく、削除時にも所有者とアーカイブ状態を確認する。
        const record = await prisma.studyRecord.delete({
            where: { id: recordId, skill: { userId, archived: null } },
            select: { skillId: true },
        });
        skillId = record.skillId;
    } catch (error) {
        console.error("学習記録の削除に失敗しました", error);
        return { success: false, error: "削除できませんでした。記録が利用可能か確認してください。" };
    }

    revalidatePath(`/dashboard/skills/${skillId}`);
    revalidatePath("/dashboard");
    revalidatePath("/explore");
    return { success: true };
}

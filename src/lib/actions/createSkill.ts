"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { skillSchema } from '@/validations/skillSchema';
import { revalidatePath } from "next/cache";

type ActionState = {
    errors?: {
        title?: string[];
        isPublic?: string[];
        form?: string[];
    };
    success?: boolean;
};



export async function createSkill(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    // userIdはログイン情報から取得
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return {
            errors: {
                form: ["ログインしてください"],
            },
        };
    }

    // フォームの入力を検証
    const validationResults = skillSchema.safeParse({
        title: formData.get("title"),
        isPublic: formData.get("isPublic"),
    });

    if (!validationResults.success) {
        return {
            errors: validationResults.error.flatten().fieldErrors,
        };
    }

    // 検証済みの名前と、ログイン中のuserIdを保存
    try {
        await prisma.skill.create({
            data: {
                title: validationResults.data.title,
                isPublic: validationResults.data.isPublic,
                userId,
            },
        });
    } catch (error) {
        console.error("スキルの登録に失敗しました", error);
        return { errors: { form: ["登録に失敗しました。時間をおいて再度お試しください。"] } };
    }

    revalidatePath('/dashboard');
    if (validationResults.data.isPublic) {
        revalidatePath('/explore');
    }

    return { success: true };
}

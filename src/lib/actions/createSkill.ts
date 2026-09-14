"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { skillSchema } from './../../validations/skillSchema';
import { revalidatePath } from "next/cache";

type ActionState = {
    errors?: {
        title?: string[];
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
    });

    if (!validationResults.success) {
        return {
            errors: validationResults.error.flatten().fieldErrors,
        };
    }

    // 検証済みの名前と、ログイン中のuserIdを保存
    await prisma.skill.create({
        data: {
            title: validationResults.data.title,
            userId,
        },
    });

    revalidatePath('/dashboard');

    return { success: true };
}
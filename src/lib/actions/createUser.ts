'use server'

import { Prisma } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { registerSchema } from "@/validations/user";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";

type ActionState = {
    success: boolean;
    errors: Record<string, string[]>;
}

function handleValidationError(error: ZodError) {
    const { fieldErrors, formErrors } = error.flatten();
    const castedFieldErrors = fieldErrors as Record<string, string[]>;
    if (formErrors.length > 0) {
        return {
            success: false,
            errors: {
                ...fieldErrors,
                confirmPassword: formErrors
            }
        }
    }
    return {
        success: false,
        errors: castedFieldErrors
    }
}

//すでに存在するメールアドレスで登録しようとした場合など自分設定のエラー処理
function handleError(customErrors: Record<string, string[]>): ActionState {
    return { success: false, errors: customErrors };
}

export async function createUser(
    prevState: ActionState,
    formData: FormData,
): Promise<ActionState> {
    //バリデーション処理
    const rawFormData = Object.fromEntries(
        ["name", "email", "password", "confirmPassword"].map((field) => [
            field, formData.get(field) as string
        ])
    ) as Record<string, string>;

    const validationResult = registerSchema.safeParse(rawFormData);

    if (!validationResult.success) {
        return handleValidationError(validationResult.error);
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email: rawFormData.email
        }
    })

    if (existingUser) {
        return handleError({
            email: ["このメールアドレスはすでに登録されています。"]
        })
    }

    //dbに登録
    const hashedPassword = await bcryptjs.hash(rawFormData.password, 10);
    await prisma.user.create({
        data: {
            name: rawFormData.name,
            email: rawFormData.email,
            password: hashedPassword
        }
    })
    await signIn('credentials', {
        ...Object.fromEntries(formData),
        redirect: false, // 自動リダイレクトを無効化
    })

    redirect('/dashboard');
}


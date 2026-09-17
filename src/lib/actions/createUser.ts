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
    const { name, email, password } = validationResult.data;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return handleError({ email: ["このメールアドレスはすでに登録されています。"] });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
    } catch (error) {
        // 同時に同じメールで登録された場合もDBの一意制約で検出する。
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return handleError({ email: ["このメールアドレスはすでに登録されています。"] });
        }
        console.error("ユーザー登録に失敗しました", error);
        return handleError({ form: ["登録処理を完了できませんでした。時間をおいて再度お試しください。"] });
    }
    try {
        await signIn('credentials', { email, password, redirect: false });
    } catch (error) {
        console.error("登録後のログインに失敗しました", error);
        return handleError({ form: ["アカウントは登録されましたが、自動ログインに失敗しました。ログイン画面からお試しください。"] });
    }

    redirect('/dashboard');
}


"use client";

import { useActionState, useId, useState } from "react";
import { updateSkill } from "@/lib/actions/updateSkill";
import type { SkillActionState } from "@/types/skillActionState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
    skill: { id: string; title: string; isPublic: boolean };
    onCancel: () => void;
    onSaved: () => void;
};

export default function EditSkillForm({ skill, onCancel, onSaved }: Props) {
    const id = useId();
    const [title, setTitle] = useState(skill.title);
    const [visibility, setVisibility] = useState(skill.isPublic ? "public" : "private");
    const [state, formAction, pending] = useActionState(
        async (prevState: SkillActionState, formData: FormData): Promise<SkillActionState> => {
            let result: SkillActionState;
            try {
                result = await updateSkill(skill.id, prevState, formData);
            } catch (error) {
                console.error("スキルの更新結果を取得できませんでした", error);
                return { success: false, errors: { form: ["通信に失敗しました。入力内容を控え、再読み込みして保存結果を確認してください。"] } };
            }
            if (result.success) onSaved();
            return result;
        },
        { success: false },
    );

    return (
        <form action={formAction} className="space-y-4" aria-label="スキルの編集">
            <div>
                <Label htmlFor={`${id}-title`}>スキル名</Label>
                <Input id={`${id}-title`} name="title" required maxLength={20} disabled={pending}
                    value={title} onChange={(event) => setTitle(event.target.value)}
                    aria-invalid={!!state.errors?.title} aria-describedby={`${id}-title-error`} />
                <p id={`${id}-title-error`} role="alert" className="text-sm text-red-600">{state.errors?.title?.join("、")}</p>
            </div>
            <div>
                <Label htmlFor={`${id}-visibility`}>公開設定</Label>
                <select id={`${id}-visibility`} name="isPublic" disabled={pending}
                    value={visibility} onChange={(event) => setVisibility(event.target.value)}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    aria-invalid={!!state.errors?.isPublic} aria-describedby={`${id}-help ${id}-visibility-error`}>
                    <option value="private">非公開</option>
                    <option value="public">公開</option>
                </select>
                <p id={`${id}-help`} className="mt-2 text-sm text-muted-foreground">
                    公開すると投稿者名・スキル名・学習状況が公開一覧に表示されます。学習メモは公開されません。
                </p>
                <p id={`${id}-visibility-error`} role="alert" className="text-sm text-red-600">{state.errors?.isPublic?.join("、")}</p>
            </div>
            <div className="flex gap-2">
                <Button type="submit" disabled={pending}>{pending ? "保存中..." : "変更を保存"}</Button>
                <Button type="button" variant="outline" disabled={pending} onClick={onCancel}>キャンセル</Button>
            </div>
            {state.errors?.form && <p role="alert" className="text-sm text-red-600">{state.errors.form.join("、")}</p>}
        </form>
    );
}

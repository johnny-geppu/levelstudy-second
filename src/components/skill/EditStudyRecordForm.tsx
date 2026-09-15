"use client";

import { useActionState, useId, useState } from "react";
import { updateStudyRecord } from "@/lib/actions/updateStudyRecord";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
    record: { id: string; studiedAt: string; minutes: number; content: string };
    today: string;
    onCancel: () => void;
    onSaved: () => void;
};

export default function EditStudyRecordForm({ record, today, onCancel, onSaved }: Props) {
    const id = useId();
    // 制御された入力にして、検証・保存に失敗した場合も入力内容を残す。
    const [studiedAt, setStudiedAt] = useState(record.studiedAt);
    const [minutes, setMinutes] = useState(String(record.minutes));
    const [content, setContent] = useState(record.content);
    const [state, formAction, pending] = useActionState(
        async (prevState: Parameters<typeof updateStudyRecord>[1], formData: FormData) => {
            let result: Parameters<typeof updateStudyRecord>[1];
            try {
                result = await updateStudyRecord(record.id, prevState, formData);
            } catch (error) {
                console.error("学習記録の更新結果を取得できませんでした", error);
                return { errors: { form: ["サーバーとの通信に失敗しました。入力内容を控え、ページを再読み込みして保存結果を確認してください。"] } };
            }
            if (result.success) onSaved();
            return result;
        },
        {},
    );

    return (
        <form action={formAction} className="space-y-4" aria-label="学習記録の編集">
            <div>
                <Label htmlFor={`${id}-date`}>学習日</Label>
                <Input id={`${id}-date`} name="studiedAt" type="date" required max={today}
                    value={studiedAt} onChange={(event) => setStudiedAt(event.target.value)} disabled={pending}
                    aria-invalid={!!state.errors?.studiedAt} aria-describedby={`${id}-date-error`} />
                <p id={`${id}-date-error`} role="alert" className="text-sm text-red-600">{state.errors?.studiedAt?.join("、")}</p>
            </div>
            <div>
                <Label htmlFor={`${id}-minutes`}>学習時間（分）</Label>
                <Input id={`${id}-minutes`} name="minutes" type="number" required min={1} max={1440} step={1}
                    value={minutes} onChange={(event) => setMinutes(event.target.value)} disabled={pending}
                    aria-invalid={!!state.errors?.minutes} aria-describedby={`${id}-minutes-error`} />
                <p id={`${id}-minutes-error`} role="alert" className="text-sm text-red-600">{state.errors?.minutes?.join("、")}</p>
            </div>
            <div>
                <Label htmlFor={`${id}-content`}>学習内容</Label>
                <textarea id={`${id}-content`} name="content" required maxLength={2000} rows={4}
                    value={content} onChange={(event) => setContent(event.target.value)} disabled={pending}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    aria-invalid={!!state.errors?.content} aria-describedby={`${id}-content-error`} />
                <p id={`${id}-content-error`} role="alert" className="text-sm text-red-600">{state.errors?.content?.join("、")}</p>
            </div>
            <div className="flex gap-2">
                <Button type="submit" disabled={pending}>{pending ? "保存中..." : "変更を保存"}</Button>
                <Button type="button" variant="outline" disabled={pending} onClick={onCancel}>キャンセル</Button>
            </div>
            {state.errors?.form && <p role="alert" className="text-sm text-red-600">{state.errors.form.join("、")}</p>}
        </form>
    );
}

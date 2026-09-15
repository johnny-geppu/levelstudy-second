"use client";

import { useActionState } from "react";
import { createStudyRecord } from "@/lib/actions/createStudyRecord";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateStudyRecordForm({ skillId, today }: { skillId: string; today: string }) {
    const [state, formAction, pending] = useActionState(createStudyRecord.bind(null, skillId), {});

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <Label htmlFor="studiedAt">学習日</Label>
                <Input id="studiedAt" name="studiedAt" type="date" defaultValue={today} max={today} required
                    aria-invalid={!!state.errors?.studiedAt} aria-describedby="studiedAt-error" />
                <p id="studiedAt-error" role="alert" className="text-sm text-red-600">{state.errors?.studiedAt?.join("、")}</p>
            </div>
            <div>
                <Label htmlFor="minutes">学習時間（分）</Label>
                <Input id="minutes" name="minutes" type="number" min={1} max={1440} step={1} required
                    aria-invalid={!!state.errors?.minutes} aria-describedby="minutes-error" />
                <p id="minutes-error" role="alert" className="text-sm text-red-600">{state.errors?.minutes?.join("、")}</p>
            </div>
            <div>
                <Label htmlFor="content">学習内容</Label>
                <textarea id="content" name="content" rows={4} maxLength={2000} required
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    aria-invalid={!!state.errors?.content} aria-describedby="content-error" />
                <p id="content-error" role="alert" className="text-sm text-red-600">{state.errors?.content?.join("、")}</p>
            </div>
            <Button type="submit" disabled={pending}>{pending ? "保存中..." : "学習記録を追加"}</Button>
            {state.errors?.form && <p role="alert" className="text-sm text-red-600">{state.errors.form.join("、")}</p>}
            {state.success && <p role="status">学習記録を追加しました。</p>}
        </form>
    );
}

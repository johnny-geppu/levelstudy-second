"use client"

import { useActionState } from "react"
import { Input } from "../ui/input";
import { createSkill } from "@/lib/actions/createSkill";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function CreateSkillForm() {
  const [state, formAction, pending] = useActionState(createSkill, {
    success: false,
    errors: {},
  });

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-2">
        <Label htmlFor="skill-title">スキル名</Label>
        <Input
          id="skill-title"
          name="title"
          placeholder="例：TypeScript"
          required
          maxLength={20}
          aria-invalid={!!state.errors?.title}
          aria-describedby={state.errors?.title ? "skill-title-error" : undefined}
        />
        {state.errors?.title && (
          <p id="skill-title-error" role="alert" className="text-sm text-red-600">
            {state.errors.title.join("、")}
          </p>
        )}
        <Label htmlFor="skill-visibility">公開設定</Label>
        <select
          id="skill-visibility"
          name="isPublic"
          defaultValue="private"
          className="rounded-md border bg-background px-3 py-2 text-sm"
          aria-invalid={!!state.errors?.isPublic}
          aria-describedby={state.errors?.isPublic
            ? "skill-visibility-help skill-visibility-error"
            : "skill-visibility-help"}
        >
          <option value="private">非公開</option>
          <option value="public">公開</option>
        </select>
        <p id="skill-visibility-help" className="text-sm text-muted-foreground">
          公開すると、投稿者名・スキル名・学習状況がみんなのスキル一覧に表示されます。学習メモは公開されません。
        </p>
        {state.errors?.isPublic && (
          <p id="skill-visibility-error" role="alert" className="text-sm text-red-600">
            {state.errors.isPublic.join("、")}
          </p>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? "追加中..." : "スキルを追加"}
        </Button>
        {state.errors?.form && (
          <p role="alert" className="text-sm text-red-600">{state.errors.form.join("、")}</p>
        )}
        {state.success && <p role="status" className="text-sm">スキルを追加しました。</p>}
      </form>
    </div>
  )
}

"use client"

import { useActionState, useState } from "react"
import { Input } from "../ui/input";
import { createSkill } from "@/lib/actions/createSkill";
import { Button } from "../ui/button";

export default function CreateSkillForm() {
  const [state, formAction, pending] = useActionState(createSkill, {
    success: false,
    errors: {},
  });

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-2">
        <Input name="title" placeholder="スキル名" />
        <Button type="submit" disabled={pending}>
          {pending ? "追加中..." : "スキルを追加"}
        </Button>
      </form>
    </div>
  )
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import EditSkillForm from "./EditSkillForm";

type Props = { skill: { id: string; title: string; isPublic: boolean } };

export default function SkillSettings({ skill }: Props) {
    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);

    return (
        <section className="space-y-4 rounded-lg border p-4">
            <h2 className="text-xl font-semibold">スキル設定</h2>
            {editing ? (
                <EditSkillForm skill={skill} onCancel={() => setEditing(false)}
                    onSaved={() => { setEditing(false); setSaved(true); }} />
            ) : (
                <>
                    <Button type="button" variant="outline" onClick={() => { setSaved(false); setEditing(true); }}>
                        スキル名・公開設定を編集
                    </Button>
                    {saved && <p role="status" className="text-sm">スキルを更新しました。</p>}
                </>
            )}
        </section>
    );
}

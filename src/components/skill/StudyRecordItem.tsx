"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import EditStudyRecordForm from "./EditStudyRecordForm";
import DeleteStudyRecordDialog from "./DeleteStudyRecordDialog";

type Props = {
    record: { id: string; studiedAt: string; minutes: number; content: string };
    dateLabel: string;
    today: string;
    canEdit: boolean;
};

export default function StudyRecordItem({ record, dateLabel, today, canEdit }: Props) {
    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);

    return (
        <li className="rounded-lg border p-4">
            {editing && canEdit ? (
                <EditStudyRecordForm record={record} today={today}
                    onCancel={() => setEditing(false)}
                    onSaved={() => { setEditing(false); setSaved(true); }} />
            ) : (
                <>
                    <p className="font-medium">{dateLabel} · {record.minutes}分</p>
                    <p className="mt-2 whitespace-pre-wrap break-words">{record.content}</p>
                    {canEdit && (
                        <div className="mt-3 flex gap-2">
                            <Button type="button" variant="outline"
                                onClick={() => { setSaved(false); setEditing(true); }}>編集</Button>
                            <DeleteStudyRecordDialog recordId={record.id} dateLabel={dateLabel} minutes={record.minutes} />
                        </div>
                    )}
                    {saved && <p role="status" className="mt-2 text-sm">学習記録を更新しました。</p>}
                </>
            )}
        </li>
    );
}

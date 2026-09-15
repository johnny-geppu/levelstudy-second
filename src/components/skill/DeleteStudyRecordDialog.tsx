"use client";

import { useRef, useState } from "react";
import { deleteStudyRecord } from "@/lib/actions/deleteStudyRecord";
import { Button } from "@/components/ui/button";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = { recordId: string; dateLabel: string; minutes: number };

export default function DeleteStudyRecordDialog({ recordId, dateLabel, minutes }: Props) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const submitting = useRef(false);

    async function handleDelete() {
        // 再描画前の連続クリックでも二重送信しない。
        if (submitting.current) return;
        submitting.current = true;
        setPending(true);
        setError("");
        try {
            const result = await deleteStudyRecord(recordId);
            if (result.success) {
                setOpen(false);
            } else {
                setError(result.error);
            }
        } catch (error) {
            console.error("削除結果を取得できませんでした", error);
            setError("通信に失敗しました。ページを再読み込みして削除結果を確認してください。");
        } finally {
            submitting.current = false;
            setPending(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={(nextOpen) => {
            if (submitting.current) return;
            setOpen(nextOpen);
            setError("");
        }}>
            <AlertDialogTrigger render={<Button type="button" variant="outline" />}>
                削除
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>この学習記録を削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                        {dateLabel}・{minutes}分の記録を削除します。削除した記録は元に戻せません。
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending}>キャンセル</AlertDialogCancel>
                    <AlertDialogAction type="button" variant="destructive" disabled={pending} onClick={handleDelete}>
                        {pending ? "削除中..." : "削除する"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

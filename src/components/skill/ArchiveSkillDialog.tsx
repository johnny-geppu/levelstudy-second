"use client";

import { useRef, useState } from "react";
import { setSkillArchived } from "@/lib/actions/setSkillArchived";
import { Button } from "@/components/ui/button";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = { skillId: string; archived: boolean; isPublic: boolean };

export default function ArchiveSkillDialog({ skillId, archived, isPublic }: Props) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const submitting = useRef(false);
    const label = archived ? "復元する" : "アーカイブする";

    async function handleConfirm() {
        if (submitting.current) return;
        submitting.current = true;
        setPending(true);
        setError("");
        try {
            const result = await setSkillArchived(skillId, !archived);
            if (result.success) setOpen(false);
            else setError(result.error);
        } catch (error) {
            console.error("アーカイブ状態の変更結果を取得できませんでした", error);
            setError("通信に失敗しました。再読み込みして変更結果を確認してください。");
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
            <AlertDialogTrigger render={<Button type="button" variant="outline" />}>{label}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{archived ? "スキルを復元しますか？" : "スキルをアーカイブしますか？"}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {archived
                            ? `通常の一覧に戻り、学習記録を変更できるようになります。${isPublic ? "公開設定が保存されているため、みんなのスキル一覧にも再公開されます。" : "非公開のまま復元されます。"}`
                            : "通常の一覧と公開一覧から非表示になります。学習履歴は残り、後から復元できます。"}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending}>キャンセル</AlertDialogCancel>
                    <AlertDialogAction type="button" disabled={pending} onClick={handleConfirm}>
                        {pending ? "変更中..." : label}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

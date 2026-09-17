import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getArchivedSkills } from "@/lib/ownSkill";
import { calculateLevel, calculateTotalStudyTime } from "@/lib/studyStats";
import { formatStudyDate } from "@/lib/studyDate";

export default async function ArchivedSkillsPage() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) redirect("/login");
    const skills = await getArchivedSkills(userId);

    return (
        <main className="page-shell mx-auto max-w-4xl space-y-6 px-4">
            <Link href="/dashboard" className="text-sm underline">マイスキルへ戻る</Link>
            <p className="eyebrow">ARCHIVE</p>
            <h1 className="page-title">アーカイブ済みのスキル</h1>
            <p>学習履歴は保存されています。スキル詳細から復元できます。</p>
            {skills.length === 0 ? <p className="empty-state">アーカイブ済みのスキルはありません。</p> : (
                <ul className="grid gap-4 sm:grid-cols-2">
                    {skills.map((skill) => (
                        <li key={skill.id}>
                            <Link href={`/dashboard/skills/${skill.id}`} className="surface skill-link space-y-2">
                                <h2 className="break-words text-lg font-semibold">{skill.title}</h2>
                                <p>Lv.{calculateLevel(skill.record.reduce((sum, record) => sum + record.minutes, 0))}</p>
                                <p>累計学習時間：{calculateTotalStudyTime(skill.record)}</p>
                                <p>アーカイブ日：{formatStudyDate(skill.archived)}</p>
                                <p className="text-sm text-muted-foreground">復元後：{skill.isPublic ? "公開" : "非公開"}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

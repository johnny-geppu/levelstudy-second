import { getOwnSkills } from "@/lib/ownSkill"
import { Skill } from "@/types/skills";
import OwnSkillCard from '@/components/skill/OwnSkillCard';
import { auth } from "@/auth";
import CreateSkillForm from "@/components/skill/CreateSkillForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getDashboardStats } from "@/lib/dashboardStats";
import { formatStudyMinutes } from "@/lib/studyStats";

export default async function SkillsPage() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!session?.user?.email || !userId) {
        redirect('/login');
    }
    const skills = await getOwnSkills(userId) as Skill[];
    const stats = await getDashboardStats(userId);
    return (
        <main className="page-shell mx-auto max-w-6xl space-y-8 px-4">
            <section className="page-heading">
                <div className="space-y-2">
                    <p className="eyebrow">MY LEARNING</p>
                    <h1 className="page-title">マイスキル</h1>
                    <p className="text-sm text-muted-foreground">今日も、自分のペースで。学びの続きを記録しましょう。</p>
                </div>
                <Link href="/dashboard/archived" className="action-link secondary">アーカイブ済み</Link>
            </section>
            <section aria-label="学習状況" className="space-y-2">
                <dl className="grid gap-4 sm:grid-cols-3">
                    <div className="stat-card">
                        <dt className="text-sm text-muted-foreground">今日の学習時間（日本時間）</dt>
                        <dd className="mt-2 text-2xl font-bold">{formatStudyMinutes(stats.todayMinutes)}</dd>
                    </div>
                    <div className="stat-card">
                        <dt className="text-sm text-muted-foreground">累計学習時間</dt>
                        <dd className="mt-2 text-2xl font-bold">{formatStudyMinutes(stats.totalMinutes)}</dd>
                    </div>
                    <div className="stat-card">
                        <dt className="text-sm text-muted-foreground">学習中のスキル数</dt>
                        <dd className="mt-2 text-2xl font-bold">{stats.activeSkillCount}件</dd>
                    </div>
                </dl>
                <p className="text-sm text-muted-foreground">学習時間にはアーカイブ済みの記録も含みます。学習日は日本時間で集計します。</p>
            </section>
            {skills.length === 0 && (
                <p className="empty-state">
                    学習中のスキルはまだありません。「＋ スキルを追加」から、最初のスキルを登録しましょう。
                    アーカイブしたスキルは「アーカイブ済み」から復元できます。
                </p>
            )}
            <h2 className="text-lg font-bold">学習中のスキル <span className="ml-2 text-sm font-normal text-muted-foreground">{skills.length}件</span></h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill) => (
                    <Link
                        key={skill.id}
                        className="skill-link"
                        href={`/dashboard/skills/${skill.id}`}
                    >
                        <OwnSkillCard key={skill.id} skill={skill} />
                    </Link>
                ))}
                <details className="add-skill">
                    <summary className="cursor-pointer font-semibold">
                        ＋ スキルを追加
                    </summary>

                    <div className="mt-4">
                        <CreateSkillForm />
                    </div>
                </details>
            </div>

        </main>
    )
}

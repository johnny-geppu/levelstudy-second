//スキル一覧ページ
import SkillCard from "@/components/skill/SkillCard";
import { getSkills } from "@/lib/skills"

export default async function page() {
    const skills = await getSkills();
    return (
        <main className="page-shell mx-auto max-w-6xl space-y-8 px-4">
            <div className="space-y-2 border-b pb-6">
                <p className="eyebrow">COMMUNITY</p>
                <h1 className="page-title">みんなのスキル</h1>
                <p className="text-sm text-muted-foreground">みんなが公開しているスキルと学習の積み重ねを見てみよう。</p>
            </div>
            {skills.length === 0 ? (
                <p className="empty-state">公開されているスキルはまだありません。</p>
            ) : (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill) => (
                        <li key={skill.id} className="min-w-0"><SkillCard skill={skill} /></li>
                    ))}
                </ul>
            )}
        </main>
    )
}

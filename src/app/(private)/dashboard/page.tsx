import { getOwnSkills } from "@/lib/ownSkill"
import { Skill } from "@/types/skills";
import OwnSkillCard from '@/components/skill/OwnSkillCard';
import { auth } from "@/auth";
import CreateSkillForm from "@/components/skill/CreateSkillForm";
import Link from "next/link";

export default async function SkillsPage(skillId: string) {
    const session = await auth();
    const userId = session?.user?.id;
    if (!session?.user?.email || !userId) {
        throw new Error('不正なリクエストです')
    }
    const skills = await getOwnSkills(userId) as Skill[];
    return (
        <main>
            <section>
                <div>
                    あなたの学習の成果を見てみよう
                </div>
            </section>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {skills.map((skill) => (
                    <Link
                        key={skill.id}
                        href={`/dashboard/skills/${skill.id}`}
                    >
                        <OwnSkillCard key={skill.id} skill={skill} />
                    </Link>
                ))}
                <details className="rounded-xl border bg-white p-4">
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

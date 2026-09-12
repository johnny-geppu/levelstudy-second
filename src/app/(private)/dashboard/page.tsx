import { getOwnSkills } from "@/lib/ownPosts"
import { Skill } from "@/types/skills";
import OwnSkillCard from '@/components/skill/OwnSkillCard';
import { auth } from "@/auth";


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
            {skills.map((skill) => (
                <OwnSkillCard key={skill.id} skill={skill} />
            ))}
        </main>
    )
}

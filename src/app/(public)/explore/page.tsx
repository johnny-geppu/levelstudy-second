//スキル一覧ページ
import SkillCard from "@/components/skill/SkillCard";
import { getSkills } from "@/lib/skills"
import { Skill } from "@/types/skills";

export default async function page() {
    const skills = await getSkills() as Skill[];
    return (
        <main>  
            <section>
                <div>
                    みんなの学習記録を見てみよう！
                </div>
            </section>
            {skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
            ))}
        </main>
    )
}

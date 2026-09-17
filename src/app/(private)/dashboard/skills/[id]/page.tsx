import { auth } from "@/auth"
import { getOwnSkill } from "@/lib/ownSkill"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import CreateStudyRecordForm from "@/components/skill/CreateStudyRecordForm"
import StudyRecordItem from "@/components/skill/StudyRecordItem"
import SkillSettings from "@/components/skill/SkillSettings"
import ArchiveSkillDialog from "@/components/skill/ArchiveSkillDialog"
import { calculateLevel, calculateTotalStudyTime } from "@/lib/studyStats"
import { formatStudyDate, getJapanDate } from "@/lib/studyDate"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default async function ShowPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth()
    const userId = session?.user?.id
    if (!session?.user?.email || !userId) {
        redirect('/login')
    }
    const { id } = await params
    const skill = await getOwnSkill(userId, id)

    if (!skill) {
        notFound()
    }
    const totalMinutes = skill.record.reduce((total, record) => total + record.minutes, 0)
    console.log(new Date(),new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }))
    console.log(getJapanDate())
    console.log(skill.createdAt)
    return (
        <main className="mx-auto max-w-3xl space-y-6 p-4">
            <Link href="/dashboard" className="text-sm underline">マイスキルへ戻る</Link>
            <Card>
                <CardHeader>
                    <CardTitle>{skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">Lv.{calculateLevel(totalMinutes)}</p>
                    <p>累計学習時間：{calculateTotalStudyTime(skill.record)}</p>
                    <p>公開状態：{skill.archived ? "非表示（アーカイブ済み）" : skill.isPublic ? "公開" : "非公開"}</p>
                    <p>作成日：{formatStudyDate(skill.createdAt)}</p>
                </CardContent>
            </Card>
            {!skill.archived && <SkillSettings skill={{ id: skill.id, title: skill.title, isPublic: skill.isPublic }} />}
            <section className="space-y-3 rounded-lg border p-4">
                <h2 className="text-xl font-semibold">{skill.archived ? "アーカイブ済み" : "スキルのアーカイブ"}</h2>
                <p>{skill.archived ? "履歴は閲覧できます。変更するには復元してください。" : "学習履歴を残して、一覧から外すことができます。"}</p>
                <ArchiveSkillDialog skillId={skill.id} archived={!!skill.archived} isPublic={skill.isPublic} />
                <Link href="/dashboard/archived" className="block text-sm underline">アーカイブ済み一覧へ</Link>
            </section>
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">学習記録を追加</h2>
                {skill.archived
                    ? <p>アーカイブ済みのスキルには記録を追加できません。</p>
                    : <CreateStudyRecordForm skillId={skill.id} today={getJapanDate()} />}
            </section>
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">学習履歴</h2>
                {skill.record.length === 0 ? <p>まだ学習記録がありません。最初の学習を記録しましょう。</p> : (
                    <ul className="space-y-3">
                        {skill.record.map((record) => (
                            <StudyRecordItem key={record.id}
                                record={{ ...record, studiedAt: record.studiedAt ? getJapanDate(record.studiedAt) : "" }}
                                dateLabel={formatStudyDate(record.studiedAt)}
                                today={getJapanDate()} canEdit={!skill.archived} />
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}

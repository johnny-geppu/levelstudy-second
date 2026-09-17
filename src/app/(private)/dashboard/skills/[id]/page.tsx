import { auth } from "@/auth"
import { getOwnSkill, getOwnStudyRecordSummary, getOwnStudyRecords } from "@/lib/ownSkill"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import CreateStudyRecordForm from "@/components/skill/CreateStudyRecordForm"
import StudyRecordItem from "@/components/skill/StudyRecordItem"
import SkillSettings from "@/components/skill/SkillSettings"
import ArchiveSkillDialog from "@/components/skill/ArchiveSkillDialog"
import { calculateLevel, formatStudyMinutes } from "@/lib/studyStats"
import { getStudyRecordPagination, STUDY_RECORD_PAGE_SIZE } from "@/lib/studyRecordPagination"
import { formatStudyDate, getJapanDate } from "@/lib/studyDate"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default async function ShowPage({ params, searchParams }: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ page?: string | string[] }>,
}) {
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
    // 集計は全記録を対象にし、表示する履歴だけを10件ずつ取得する。
    const summary = await getOwnStudyRecordSummary(userId, id)
    const totalMinutes = summary._sum.minutes ?? 0
    const totalCount = summary._count._all
    const query = await searchParams
    const { page, totalPages, skip, requestedPage } = getStudyRecordPagination(query.page, totalCount)
    if (requestedPage !== page) {
        redirect(`/dashboard/skills/${id}?page=${page}`)
    }
    const records = await getOwnStudyRecords(userId, id, skip, STUDY_RECORD_PAGE_SIZE)
    console.log(new Date(),new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }))
    console.log(getJapanDate())
    console.log(skill.createdAt)
    return (
        <main className="page-shell mx-auto max-w-3xl space-y-6 px-4">
            <Link href="/dashboard" className="text-sm underline">マイスキルへ戻る</Link>
            <Card>
                <CardHeader>
                    <p className="eyebrow">SKILL OVERVIEW</p>
                    <CardTitle><h1 className="page-title break-words">{skill.title}</h1></CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-4xl font-bold text-primary">Lv.{calculateLevel(totalMinutes)}</p>
                    <p>累計学習時間：{formatStudyMinutes(totalMinutes)}</p>
                    <p>公開状態：{skill.archived ? "非表示（アーカイブ済み）" : skill.isPublic ? "公開" : "非公開"}</p>
                    <p>作成日：{formatStudyDate(skill.createdAt)}</p>
                </CardContent>
            </Card>
            {!skill.archived && <SkillSettings skill={{ id: skill.id, title: skill.title, isPublic: skill.isPublic }} />}
            <section className="surface space-y-3">
                <h2 className="text-xl font-semibold">{skill.archived ? "アーカイブ済み" : "スキルのアーカイブ"}</h2>
                <p>{skill.archived ? "履歴は閲覧できます。変更するには復元してください。" : "学習履歴を残して、一覧から外すことができます。"}</p>
                <ArchiveSkillDialog skillId={skill.id} archived={!!skill.archived} isPublic={skill.isPublic} />
                <Link href="/dashboard/archived" className="block text-sm underline">アーカイブ済み一覧へ</Link>
            </section>
            <section className="surface space-y-4">
                <h2 className="text-xl font-semibold">学習記録を追加</h2>
                {skill.archived
                    ? <p>アーカイブ済みのスキルには記録を追加できません。</p>
                    : <CreateStudyRecordForm skillId={skill.id} today={getJapanDate()} />}
            </section>
            <section className="surface space-y-4">
                <h2 className="text-xl font-semibold">学習履歴</h2>
                <p className="text-sm">全{totalCount}件 · {page} / {totalPages}ページ</p>
                {totalCount === 0 ? <p>まだ学習記録がありません。最初の学習を記録しましょう。</p> : (
                    <ul className="space-y-3">
                        {records.map((record) => (
                            <StudyRecordItem key={record.id}
                                record={{ ...record, studiedAt: record.studiedAt ? getJapanDate(record.studiedAt) : "" }}
                                dateLabel={formatStudyDate(record.studiedAt)}
                                today={getJapanDate()} canEdit={!skill.archived} />
                        ))}
                    </ul>
                )}
                {totalPages > 1 && (
                    <nav aria-label="学習履歴のページ切り替え" className="flex items-center gap-4">
                        {page > 1 && (
                            <Link href={`/dashboard/skills/${id}?page=${page - 1}`} className="underline">前のページ</Link>
                        )}
                        {page < totalPages && (
                            <Link href={`/dashboard/skills/${id}?page=${page + 1}`} className="underline">次のページ</Link>
                        )}
                    </nav>
                )}
            </section>
        </main>
    )
}

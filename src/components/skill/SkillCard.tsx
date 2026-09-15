import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateTotalStudyTime } from "@/lib/studyStats";
import { findLatestStudyDate } from "@/lib/studyStats";
import type { SkillCardProps } from "@/types/skills";

export default function SkillCard({ skill }: SkillCardProps) {
    // 全記録の学習時間を合計する
    const totalStudyTime = calculateTotalStudyTime(skill.record);
    const latestStudyDate = findLatestStudyDate(skill.record);
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="truncate" title={skill.title}>
                    {skill.title}
                </CardTitle>

                <p className="truncate text-sm text-muted-foreground">
                    {skill.user.name}
                </p>
            </CardHeader>

            <CardContent>
                {skill.record.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        まだ学習記録がありません
                    </p>
                ) : (
                    <dl className="space-y-4">
                        <div>
                            <dt className="text-sm text-muted-foreground">
                                累計学習時間
                            </dt>
                            <dd className="mt-1 text-2xl font-bold">
                                {totalStudyTime}
                            </dd>
                        </div>

                        <div className="flex justify-between gap-4 border-t pt-4">
                            <dt className="text-sm text-muted-foreground">
                                学習記録
                            </dt>
                            <dd className="text-sm font-medium">
                                {skill.record.length}件
                            </dd>
                        </div>

                        <div className="flex justify-between gap-4">
                            <dt className="text-sm text-muted-foreground">
                                最終学習日
                            </dt>
                            <dd className="text-sm font-medium">
                                {latestStudyDate?.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" }) ?? "-"}
                            </dd>
                        </div>
                    </dl>
                )}
            </CardContent>
        </Card>
    );
}

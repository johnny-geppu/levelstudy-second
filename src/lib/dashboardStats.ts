import { prisma } from "./prisma";
import { getJapanDayRange } from "./studyDate";

export async function getDashboardStats(userId: string) {
    const { start, end } = getJapanDayRange();
    const [today, total, activeSkillCount] = await prisma.$transaction([
        prisma.studyRecord.aggregate({
            where: {
                skill: { userId },
                studiedAt: { gte: start, lt: end },
            },
            _sum: { minutes: true },
        }),
        // アーカイブ後も、これまでの学習時間は累計に残す。
        prisma.studyRecord.aggregate({
            where: { skill: { userId } },
            _sum: { minutes: true },
        }),
        prisma.skill.count({ where: { userId, archived: null } }),
    ]);

    return {
        todayMinutes: today._sum.minutes ?? 0,
        totalMinutes: total._sum.minutes ?? 0,
        activeSkillCount,
    };
}

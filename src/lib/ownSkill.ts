import { prisma } from "./prisma";

export async function getArchivedSkills(userId: string) {
    return prisma.skill.findMany({
        where: { userId, archived: { not: null } },
        select: {
            id: true, title: true, isPublic: true, archived: true,
            record: { select: { minutes: true, studiedAt: true } },
        },
        orderBy: [{ archived: "desc" }, { id: "desc" }],
    });
}

export async function getOwnSkills(userId: string) {
    return await prisma.skill.findMany({
        where: {
            userId: userId,
            archived: null,
        },
        select: {
            id: true,
            title: true,
            xp: true,
            isPublic: true,
            createdAt: true,
            archived: true,
            record: {
                select: {
                    id: true,
                    minutes: true,
                    studiedAt: true
                }
            },

        }

    })
}

export async function getOwnSkill(userId: string, skillId: string) {
    return await prisma.skill.findFirst({
        where: {
            AND: [
                {
                    userId,
                    id: skillId,
                }
            ]
        },
        select: {
            id: true,
            title: true,
            isPublic: true,
            archived: true,
            createdAt: true,
            record: {
                select: {
                    id: true,
                    content: true,
                    minutes: true,
                    studiedAt: true,
                },
                orderBy: [
                    { studiedAt: { sort: "desc", nulls: "last" } },
                    { createdAt: "desc" },
                    { id: "desc" },
                ],
            },
        }
    })
}

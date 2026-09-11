import { prisma } from "./prisma";

export async function getOwnSkill(userId: string) {
    return await prisma.skill.findMany({
        where: {
            userId: userId,
            archived: null,
        },

    })
}
//published設定のスキル一覧

import { prisma } from "@/lib/prisma";

export async function getSkills() {
    const skills = await prisma.skill.findMany({
        where: {
            isPublic: true,
            archived: null,
        },
        include: {
            user:{
                select: {
                    name: true
                }
            },
            record: {
                select: {
                    id: true,
                    minutes: true,
                    studiedAt: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return skills;
}
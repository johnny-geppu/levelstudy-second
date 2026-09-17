//published設定のスキル一覧

import { prisma } from "@/lib/prisma";

export async function getSkills() {
    const skills = await prisma.skill.findMany({
        where: {
            isPublic: true,
            archived: null,
        },
        select: {
            id: true,
            title: true,
            user:{
                select: {
                    name: true
                }
            },
            record: {
                select: {
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

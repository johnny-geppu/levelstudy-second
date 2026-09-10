// seedデータ作成

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // 古いseedデータを削除
    await prisma.studyRecord.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash("password123", 10);

    // =========================
    // ユーザー1
    // =========================
    const user1 = await prisma.user.create({
        data: {
            name: "Johnny Gep",
            email: "user@example.com",
            password: hashedPassword,
        },
    });

    const programming = await prisma.skill.create({
        data: {
            title: "プログラミング",
            userId: user1.id,
            archived: null,
            isPublic: true,
        }
    });

    const english = await prisma.skill.create({
        data: {
            title: "英語",
            userId: user1.id,
            archived: null,
            isPublic: false,
        }
    });

    await prisma.studyRecord.create({
        data: {
            content: "Next.jsの勉強",
            minutes: 60,
            skillId: programming.id,
        }
    });

    await prisma.studyRecord.create({
        data: {
            content: "Prismaの勉強",
            minutes: 45,
            skillId: programming.id,
        }
    });

    await prisma.studyRecord.create({
        data: {
            content: "英単語を勉強",
            minutes: 30,
            skillId: english.id,
        }
    });


    // =========================
    // ユーザー2
    // =========================
    const user2 = await prisma.user.create({
        data: {
            name: "Alice",
            email: "alice@example.com",
            password: hashedPassword,
        },
    });

    const python = await prisma.skill.create({
        data: {
            title: "Python",
            userId: user2.id,
            archived: null,
            isPublic: true,
        }
    });

    const math = await prisma.skill.create({
        data: {
            title: "数学",
            userId: user2.id,
            archived: null,
            isPublic: true,
        }
    });

    await prisma.studyRecord.create({
        data: {
            content: "Python基礎",
            minutes: 90,
            skillId: python.id,
        }
    });

    await prisma.studyRecord.create({
        data: {
            content: "微分方程式",
            minutes: 50,
            skillId: math.id,
        }
    });


    // =========================
    // ユーザー3
    // =========================
    const user3 = await prisma.user.create({
        data: {
            name: "Bob",
            email: "bob@example.com",
            password: hashedPassword,
        },
    });

    const mechanics = await prisma.skill.create({
        data: {
            title: "機械工学",
            userId: user3.id,
            archived: null,
            isPublic: true,
        }
    });

    const react = await prisma.skill.create({
        data: {
            title: "React",
            userId: user3.id,
            archived: null,
            isPublic: false,
        }
    });

    await prisma.studyRecord.create({
        data: {
            content: "熱力学",
            minutes: 70,
            skillId: mechanics.id,
            studiedAt: new Date("2023-08-01T10:00:00Z"),
        }
    });

    await prisma.studyRecord.create({
        data: {
            content: "useStateの復習",
            minutes: 40,
            skillId: react.id,
        }
    });
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
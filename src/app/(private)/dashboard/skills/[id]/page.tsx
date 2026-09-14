import { auth } from "@/auth"
import { getOwnSkill } from "@/lib/ownSkill"
import { notFound } from "next/navigation"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default async function ShowPage({ params }: { params: { id: string } }) {
    const session = await auth()
    const userId = session?.user?.id
    if (!session?.user?.email || !userId) {
        throw new Error('不正なリクエストです')
    }
    const { id } = await params
    const skill = await getOwnSkill(userId, id)

    if (!skill) {
        notFound()
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>作成日: {new Date(skill.createdAt).toLocaleDateString()}</p>
                </CardContent>
            </Card>
        </div>
    )
} 
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import Link from "next/link"

export default function Setting({ session }: { session: Session }) {
    const handleLogout = async () => {
        'use server'
        await signOut({ redirectTo: '/' })
    }
    return (
        <DropdownMenu>

            <DropdownMenuTrigger render={<Button variant="ghost" />}>
                {session.user?.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem render={<Link href="/explore" />}>
                    みんなのスキル
                </DropdownMenuItem>
                <form action={handleLogout}>
                    <DropdownMenuItem render={<button type="submit" />} className="w-full">
                        ログアウト
                    </DropdownMenuItem>
                </form>
                <DropdownMenuItem render={<Link href="/profile" />}>
                    プロフィール
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu >
    )
}

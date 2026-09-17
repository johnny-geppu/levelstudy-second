import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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

            <DropdownMenuTrigger render={<Button variant="outline" className="max-w-44" />} aria-label="アカウントメニュー">
                <span className="truncate">{session.user?.name}</span><span aria-hidden="true">⌄</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem render={<Link href="/dashboard" />}>
                    マイスキル
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/explore" />}>
                    みんなのスキル
                </DropdownMenuItem>
                <form action={handleLogout}>
                    <DropdownMenuItem render={<button type="submit" />} className="w-full">
                        ログアウト
                    </DropdownMenuItem>
                </form>

            </DropdownMenuContent>
        </DropdownMenu >
    )
}

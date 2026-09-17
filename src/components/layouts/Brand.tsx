import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Brand() {
    return <Link href="/" className="brand" aria-label="LevelStudy ホーム">
        <span className="brand-mark"><BookOpen size={19} aria-hidden="true" /></span>
        LevelStudy<span className="text-primary">.</span>
    </Link>;
}

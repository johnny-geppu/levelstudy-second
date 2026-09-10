export type Skill = {
    id: string;
    title: string;
    userId: string;
    archived: Date | null;
    isPublic: boolean;
    createdAt: Date;
    xp: number;
    user: {
        name: string;
    };
    record: {
        id: string;
        minutes: number;
        studiedAt: Date;
    }[];
}

export type SkillCardProps = {
    skill: Skill;
}
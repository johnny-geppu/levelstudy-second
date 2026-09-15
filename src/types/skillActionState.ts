export type SkillActionState = {
    success: boolean;
    errors?: {
        title?: string[];
        isPublic?: string[];
        form?: string[];
    };
};

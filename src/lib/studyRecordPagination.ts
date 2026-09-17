export const STUDY_RECORD_PAGE_SIZE = 10;

export function getStudyRecordPagination(value: string | string[] | undefined, totalCount: number) {
    const parsed = typeof value === "string" && /^\d+$/.test(value) ? Number(value) : 1;
    const requestedPage = Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
    const totalPages = Math.max(1, Math.ceil(totalCount / STUDY_RECORD_PAGE_SIZE));
    const page = Math.min(requestedPage, totalPages);

    return { page, totalPages, skip: (page - 1) * STUDY_RECORD_PAGE_SIZE, requestedPage };
}

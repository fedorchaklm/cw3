export const getMaxPages = (total: number, limit: number): number => {
    return Math.ceil(total / limit);
}
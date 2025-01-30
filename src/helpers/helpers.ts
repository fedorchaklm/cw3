export const getMaxPages = (total: number, limit: number): number => {
    return Math.ceil(total / limit);
}

export const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
}
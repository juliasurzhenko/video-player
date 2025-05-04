export function paginate<T>(
    items: T[],
    page: number,
    limit: number
): T[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    return items.slice(start, end);
}
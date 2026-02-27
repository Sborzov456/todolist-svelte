export function keyBy<T extends Record<PropertyKey, unknown>>(
    array: T[],
    key: keyof T,
): Partial<Record<PropertyKey, T>> {
    return array.reduce<Record<PropertyKey, T>>((acc, item) => {
        const recordKey = item[key];
        if (typeof recordKey === "string") {
            acc[recordKey] = item;
        }
        return acc;
    }, {});
}

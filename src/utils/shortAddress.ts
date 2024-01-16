export const shortAddress = (value: string): string => {
    if (value.length <= 5) {
        return value;
    } else {
        return value.slice(0, 5) + '....' + value.slice(-5);
    }
}
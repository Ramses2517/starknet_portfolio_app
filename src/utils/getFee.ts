export const getFee = (value: string): string => {
    return `${(Number(value) / 10 ** 18).toFixed(6)} ETH`
}
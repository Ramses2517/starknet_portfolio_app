export const getTxStatus = (value: string): string => {
    if (value === 'ACCEPTED_ON_L1') {
        return 'Accepted on L1'
    } else if (value === 'ACCEPTED_ON_L2') {
        return 'Accepted on L2'
    } else {
        return value
    }

}
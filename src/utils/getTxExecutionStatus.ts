export const getTxExecutionStatus = (value: string): string => {
    if (value === 'SUCCEEDED') {
        return 'Success'
    } else if (value === 'REVERTED') {
        return 'Reverted'
    } else {
        return value
    }

}
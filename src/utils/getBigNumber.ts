import BigNumber from "bignumber.js";

export const getBigNumber = (value: string): BigNumber => {
    return new BigNumber(value);
};

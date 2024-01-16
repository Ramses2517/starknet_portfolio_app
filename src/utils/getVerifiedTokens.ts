import {VERIFIER_API_URL} from "../constants/urls";
import {IApiVerifiedTokenAnswer} from "../types/apiTypes";
import {IVerifiedToken} from "../types/conversionTypes";


const verifiedTokenTypeConversion = (apiObject: IApiVerifiedTokenAnswer): IVerifiedToken => {
    return {
        address: apiObject.address,
        name: apiObject.name,
        price: apiObject.price,
        logoUrl: apiObject.logo_url,
    }
}

interface CoinData {
    address: string;
    name: string;
    price: string;
    logoUrl: string;
}

export interface IVerifiedTokens {
    [address: string]: CoinData;
}

export const getVerifiedTokens = async (chainName: String): Promise<IVerifiedTokens | null> => {
    try {
        const response = await fetch(`${VERIFIER_API_URL}/tokens/${chainName}`);
        const data = await response.json();

        const tokens = data.result.map((apiObject: IApiVerifiedTokenAnswer) => verifiedTokenTypeConversion(apiObject))
        return tokens.reduce((acc: IVerifiedTokens, item: any) => {
            const {address, ...rest} = item;
            acc[address] = rest;
            return acc;
        }, {})
    } catch (error) {
        return null
    }
}
import {REST_API_URL} from "../constants/urls";
import {IToken} from "../types/conversionTypes";
import {IApiTokenAnswer} from "../types/apiTypes";
import {getVerifiedTokens} from "./getVerifiedTokens";
import {STARKNET} from "../constants/names";


const tokenTypeConversion = (apiObject: IApiTokenAnswer): IToken => {
    return {
        address: apiObject.address,
        symbol: apiObject.symbol,
        amount: apiObject.amount,
    }
}

export const getTokens = async (address: String): Promise<IToken[]> => {
    try {
        const response = await fetch(`${REST_API_URL}/tokens/${address}`);
        const data = await response.json();
        const tokens = data.result.map((apiObject: IApiTokenAnswer) => tokenTypeConversion(apiObject))
        const verifiedTokens = await getVerifiedTokens(STARKNET)
        if (verifiedTokens !== null) {
            return tokens.map((tokenObject: IToken) => {
                return {
                    ...tokenObject,
                    name: verifiedTokens[tokenObject.address]?.name || null,
                    price: verifiedTokens[tokenObject.address]?.price || null,
                    logoUrl: verifiedTokens[tokenObject.address]?.logoUrl || null,
                    value: Number(tokenObject.amount) * Number(verifiedTokens[tokenObject.address]?.price || 0)
                }
            })
        } else {
            return tokens.map((tokenObject: IToken) => {
                return {
                    ...tokenObject,
                    name: null,
                    price: null,
                    logoUrl: null,
                    value: 0
                }
            })
        }

    } catch (error) {
        return []
    }
}
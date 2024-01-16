import {REST_API_URL} from "../constants/urls";
import {IApiNftContractAnswer} from "../types/apiTypes";
import {INftContract} from "../types/conversionTypes";


const nftContractTypeConversion = (apiObject: IApiNftContractAnswer): INftContract => {
    return {
        contractAddress: apiObject.contract_address,
        type: apiObject.type,
        name: apiObject.name,
        description: apiObject.description,
        symbol: apiObject.symbol,
    }
}

export const getNftContract = async (address: String): Promise<INftContract | null> => {
    try {
        const response = await fetch(`${REST_API_URL}/nft_contract/${address}`);
        const data = await response.json();
        return nftContractTypeConversion(data.result)
    } catch (error) {
        return null
    }
}
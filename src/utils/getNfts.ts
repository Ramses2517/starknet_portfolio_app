import {REST_API_URL} from "../constants/urls";
import {IApiNftAnswer} from "../types/apiTypes";
import {INft} from "../types/conversionTypes";


const nftTypeConversion = (apiObject: IApiNftAnswer): INft => {
    return {
        contractAddress: apiObject.contract_address,
        tokenId: apiObject.token_id,
        name: apiObject.name,
        description: apiObject.description,
        imageUrl: apiObject.image_url,
        animationUrl: apiObject.animation_url
    }
}

export const getNfts = async (address: String): Promise<INft[]> => {
    try {
        const response = await fetch(`${REST_API_URL}/nfts/${address}`);
        const data = await response.json();
        return data.result.map((apiObject: IApiNftAnswer) => nftTypeConversion(apiObject))
    } catch (error) {
        return []
    }
}
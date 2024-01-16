import {REST_API_URL} from "../constants/urls";
import {IEvent} from "../types/conversionTypes";
import {IApiEventAnswer} from "../types/apiTypes";


const eventTypeConversion = (apiObject: IApiEventAnswer): IEvent => {
    return {
        transactionHash: apiObject.transaction_hash,
        blockNumber: apiObject.block_number,
        timestamp: apiObject.timestamp,
        eventIndex: apiObject.event_index,
        fromAddress: apiObject.from_address,
        keyName: apiObject.key_name
    }
}

export const getEvents = async (address: String): Promise<IEvent[]> => {
    try {
        const response = await fetch(`${REST_API_URL}/events/${address}`);
        const data = await response.json();
        return data.result.map((eventObject: IApiEventAnswer) => eventTypeConversion(eventObject))
    } catch (error) {
        return []
    }
}
import {REST_API_URL} from "../constants/urls";
import {ITransaction} from "../types/conversionTypes";
import {IApiTxAnswer} from "../types/apiTypes";


const transactionTypeConversion = (apiObject: IApiTxAnswer): ITransaction => {
    return {
        transactionHash: apiObject.transaction_hash,
        blockNumber: apiObject.block_number,
        timestamp: apiObject.timestamp,
        transactionIndex: apiObject.transaction_index,
        executionStatus: apiObject.execution_status,
        status: apiObject.status,
        type: apiObject.type,
        fee: apiObject.fee,
        sender: apiObject.sender,
        contractAddress: apiObject.contract_address
    }
}


export const getTransactions = async (address: String): Promise<ITransaction[]> => {
    try {
        const response = await fetch(`${REST_API_URL}/transactions/${address}`);
        const data = await response.json();
        return data.result.map((transactionObject: IApiTxAnswer) => transactionTypeConversion(transactionObject))
    } catch (error) {
        return []
    }
}
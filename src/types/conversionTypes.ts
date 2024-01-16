export interface ITransaction {
    transactionHash: string,
    blockNumber: number,
    timestamp: number,
    transactionIndex: number,
    executionStatus: string,
    status: string,
    type: string,
    fee: string,
    sender: string,
    contractAddress: string | null
}

export interface IEvent {
    transactionHash: string,
    blockNumber: number,
    timestamp: number,
    eventIndex: number,
    fromAddress: string,
    keyName: string
}

export interface INftContract {
    contractAddress: string,
    type: string,
    name: string | null,
    description: string | null,
    symbol: string | null,
}


export interface INft {
    contractAddress: string,
    tokenId: string,
    name: string | null,
    description: string | null,
    imageUrl: string | null,
    animationUrl: string | null
}

export interface IToken {
    address: string,
    symbol: string,
    amount: string,
    value?: number,
    price?: string
    logoUrl?: string
}

export interface IVerifiedToken {
    address: string,
    name: string | null,
    price: number,
    logoUrl: string
}



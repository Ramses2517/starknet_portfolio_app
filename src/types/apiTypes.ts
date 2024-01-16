export interface IApiTxAnswer {
    transaction_hash: string,
    block_number: number,
    timestamp: number,
    transaction_index: number,
    execution_status: string,
    status: string,
    type: string,
    fee: string,
    sender: string,
    contract_address: string | null
}

export interface IApiEventAnswer {
    transaction_hash: string,
    block_number: number,
    timestamp: number,
    event_index: number,
    from_address: string,
    key_name: string
}

export interface IApiNftContractAnswer {
    contract_address: string,
    type: string,
    name: string | null,
    description: string | null,
    symbol: string | null,
}

export interface IApiNftAnswer {
    contract_address: string,
    token_id: string,
    name: string | null,
    description: string | null,
    image_url: string | null,
    animation_url: string | null
}

export interface IApiTokenAnswer {
    address: string,
    symbol: string,
    amount: string,
}

export interface IApiVerifiedTokenAnswer {
    address: string,
    name: string | null,
    price: number,
    logo_url: string
}
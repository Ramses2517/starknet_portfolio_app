import React, {useEffect, useState} from "react";
import {IToken} from "../types/conversionTypes";
import {validateAddress} from "../utils/validateAddress";
import {getTokens} from "../utils/getTokens";
import {Table} from "antd";
import {ExplorerLink} from "./ExplorerLink";
import {ADDRESS} from "../constants/types";
import {shortAddress} from "../utils/shortAddress";
import {LogoAndSymbol} from "./LogoAndSymbol";

interface ITokensProps {
    address: string;
    setTotalSum: (value: number) => void;
}

const tokenColumns = [
    {
        title: 'Token',
        key: 'symbol',
        render: (object: IToken) => <LogoAndSymbol symbol={object.symbol} logoUrl={object.logoUrl!}/>
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Address',
        key: 'address',
        render: (object: IToken) => {
            return object.address ? <ExplorerLink
                value={object.address} type={ADDRESS}>{shortAddress(object.address)}</ExplorerLink> : ""
        }
    },
    {
        title: 'Amount',
        key: 'amount',
        render: (object: IToken) =>
            <span>{Number(object.amount) < 1 ? Number(object.amount).toFixed(18) + ' ' + object.symbol : Number(object.amount) + ' ' + object.symbol}</span>
    },
    {
        title: 'Price',
        key: 'price',
        render: (object: IToken) => <span>{object.price ? '$' + object.price : ''}</span>
    },
    {
        title: 'Value',
        key: 'value',
        render: (object: IToken) => <span>{object?.value !== 0 ? '$' + Number(object.value).toFixed(2) : ""}</span>
    },

];


export const Tokens = ({address, setTotalSum}: ITokensProps) => {
    const [tokens, setTokens] = useState<IToken[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    const getTokensData = async () => {
        setTokens([])
        setLoading(false)
        if (validateAddress(address)) {
            setLoading(true)
            const data = await getTokens(address)
            setTokens(data.sort((x, y) => (y.value || 0) - (x.value || 0)))
            let tokensValue = 0
            data.forEach((x) => tokensValue += x.value || 0)
            setTotalSum(tokensValue)
            setLoading(false)
        }
    }


    useEffect(() => {
        getTokensData()
    }, [address])

    const paginationConfig = {
        pageSize: 15,
    };


    return <div>
        <Table loading={loading} columns={tokenColumns} dataSource={tokens} pagination={paginationConfig}></Table>
    </div>
}
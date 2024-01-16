import React, {useEffect, useState} from "react";
import {validateAddress} from "../utils/validateAddress";
import {Table} from "antd";
import {getTransactions} from "../utils/getTransactions";
import {ITransaction} from "../types/conversionTypes";
import {shortAddress} from "../utils/shortAddress";
import {ExplorerLink} from "./ExplorerLink";
import {ADDRESS, TRANSACTION} from "../constants/types";
import {getHumanDateFormat} from "../utils/getHumanDateFormat";
import {getFee} from "../utils/getFee";
import {getTxStatus} from "../utils/getTxStatus";

interface ITransactionsProps {
    address: string;
}


const transactionsColumns = [
    {
        title: 'Hash',
        key: 'transactionHash',
        render: (object: ITransaction) => <ExplorerLink
            value={object.transactionHash} type={TRANSACTION}>{shortAddress(object.transactionHash)}</ExplorerLink>
    },
    {
        title: 'Block',
        dataIndex: 'blockNumber',
        key: 'blockNumber',
    },
    {
        title: 'Time',
        key: 'timestamp',
        render: (object: ITransaction) => <span>{getHumanDateFormat(object.timestamp)}</span>
    },
    {
        title: 'Sender',
        key: 'sender',
        render: (object: ITransaction) => {
            return object.sender ? <ExplorerLink
                value={object.sender} type={ADDRESS}>{shortAddress(object.sender)}</ExplorerLink> : ""
        }
    },
    {
        title: 'Contract',
        key: 'contractAddress',
        render: (object: ITransaction) => {
            return object.contractAddress ? <ExplorerLink
                value={object.contractAddress} type={ADDRESS}>{shortAddress(object.contractAddress)}</ExplorerLink> : ""
        }
    },
    {
        title: 'Fee',
        key: 'fee',
        render: (object: ITransaction) => <span>{getFee(object.fee)}</span>

    },
    {
        title: 'Status',
        key: 'status',
        render: (object: ITransaction) => <span>{getTxStatus(object.status)}</span>
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },

];


export const Transactions = ({address}: ITransactionsProps) => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    const getTransactionsData = async () => {
        setTransactions([])
        setLoading(false)
        if (validateAddress(address)) {
            setLoading(true)
            const data = await getTransactions(address)
            setTransactions(data)
            setLoading(false)
        }
    }


    useEffect(() => {
        getTransactionsData()
    }, [address])

    const paginationConfig = {
        pageSize: 15,
    };

    return <div>
        <Table pagination={paginationConfig} loading={loading} columns={transactionsColumns}
               dataSource={transactions}></Table>
    </div>
}
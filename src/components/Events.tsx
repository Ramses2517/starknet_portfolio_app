import React, {useEffect, useState} from "react";
import {validateAddress} from "../utils/validateAddress";
import {Table} from "antd";
import {IEvent} from "../types/conversionTypes";
import {getEvents} from "../utils/getEvents";
import {ExplorerLink} from "./ExplorerLink";
import {ADDRESS, TRANSACTION} from "../constants/types";
import {shortAddress} from "../utils/shortAddress";
import {getHumanDateFormat} from "../utils/getHumanDateFormat";

interface IEventsProps {
    address: string;
}


const eventsColumns = [
    {
        title: 'Hash',
        key: 'transactionHash',
        render: (object: IEvent) => <ExplorerLink
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
        render: (object: IEvent) => <span>{getHumanDateFormat(object.timestamp)}</span>
    },
    {
        title: 'From Address',
        key: 'fromAddress',
        render: (object: IEvent) => {
            return object.fromAddress ? <ExplorerLink
                value={object.fromAddress} type={ADDRESS}>{shortAddress(object.fromAddress)}</ExplorerLink> : ""
        }
    },
    {
        title: 'Key',
        dataIndex: 'keyName',
        key: 'keyName',
    }

];


export const Events = ({address}: IEventsProps) => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    const getEventsData = async () => {
        setEvents([])
        setLoading(false)
        if (validateAddress(address)) {
            setLoading(true)
            const data = await getEvents(address)
            setEvents(data)
            setLoading(false)
        }
    }


    useEffect(() => {
        getEventsData()
    }, [address])

    const paginationConfig = {
        pageSize: 15,
    };

    return <div>
        <Table loading={loading} columns={eventsColumns} dataSource={events} pagination={paginationConfig}></Table>
    </div>
}
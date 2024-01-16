import React, {useState} from "react";
import type {TabsProps} from 'antd';
import {Tabs} from 'antd';
import {Tokens} from "./Tokens";
import {Transactions} from "./Transactions";
import {Events} from "./Events";
import {NftGallery} from "./NftGallery";
import {validateAddress} from "../utils/validateAddress";
import {PortfolioStyles} from "../styles/PortfolioStyles";
import {WalletAddress} from "./WalletAddress";

export const Portfolio = ({}) => {

    const [address, setAddress] = useState<string>("")
    const [totalSum, setTotalSum] = useState<number>(0)


    const portfolioItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Tokens',
            children: <div className={PortfolioStyles.tabComponent}><Tokens address={address}
                                                                            setTotalSum={setTotalSum}/></div>,
        },
        {
            key: '2',
            label: "NFT Gallery",
            children: <div className={PortfolioStyles.tabComponent}><NftGallery address={address}/></div>,
        },
        {
            key: '3',
            label: 'Transactions',
            children: <div className={PortfolioStyles.tabComponent}><Transactions address={address}/></div>,
        },
        {
            key: '4',
            label: 'Events',
            children: <div className={PortfolioStyles.tabComponent}><Events address={address}/></div>,
        },
    ];


    return <div>
        <div className={PortfolioStyles.container}>
            <div className={PortfolioStyles.meta}>
                <WalletAddress address={address} setAddress={setAddress}/>
                <div className={PortfolioStyles.totalValue}>{'$' + totalSum.toFixed(2)}</div>
            </div>
            {validateAddress(address) &&
                <Tabs defaultActiveKey="1" items={portfolioItems}/>
            }
            {!validateAddress(address) &&
                <span className={PortfolioStyles.empty}>{'To view your assets please enter your address'}</span>}
        </div>
    </div>
}
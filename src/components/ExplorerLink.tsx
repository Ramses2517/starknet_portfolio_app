import {STARKSCAN} from "../constants/urls";
import React, {ReactNode} from "react";

interface IExplorerLinkProps {
    value: string,
    type: 'address' | 'transaction' | 'nft' | 'nftContract',
    children: ReactNode
}


const links = {
    'address': 'contract',
    'transaction': 'tx',
    'nft': 'nft',
    'nftContract': 'nft-contract'
}

export const ExplorerLink = ({value, type, children}: IExplorerLinkProps) => {
    return <a href={`${STARKSCAN}/${links[type]}/${value}`} target={"_blank"}>{children}</a>

}
import {WalletAddressStyles} from "../styles/WalletAddressStyles";
import starknetLogo from "../pics/starknetLogo.png"
import {Input} from "antd";
import React from "react";
import {shortAddress} from "../utils/shortAddress";
import {validateAddress} from "../utils/validateAddress";
import externalLink from "../pics/externalLink.png"
import {ExplorerLink} from "./ExplorerLink";

interface IWalletAddressProps {
    address: string;
    setAddress: (value: string) => void;
}

export const WalletAddress = ({address, setAddress}: IWalletAddressProps) => {

    const handleInputChange = (event: any) => {
        const value = event.target.value
        if (validateAddress(value)) {
            setAddress(event.target.value)
        }
    }

    return <div className={WalletAddressStyles.container}>
        <div className={WalletAddressStyles.imageBox}><img className={WalletAddressStyles.imageWrapper}
                                                           alt={starknetLogo} src={starknetLogo || starknetLogo}/>
        </div>
        <div className={WalletAddressStyles.testAndInput}>
            <div className={WalletAddressStyles.addressContainer}>
                <span className={WalletAddressStyles.address}>{shortAddress(address) || '\t—'}</span>
                {address && <ExplorerLink value={address} type={'address'}><img src={externalLink}
                                                                                className={WalletAddressStyles.iconWrapper}/></ExplorerLink>}
            </div>
            <Input rootClassName={WalletAddressStyles.input} placeholder={'Input your address here...'} size={"small"}
                   onChange={handleInputChange}/>
        </div>
    </div>

}


import {useEffect, useState} from "react";
import {INft} from "../types/conversionTypes";
import {validateAddress} from "../utils/validateAddress";
import {getNfts} from "../utils/getNfts";
import {NftCard} from "./NftCard";
import {NftGalleryStyles} from "../styles/NftGalleryStyles";
import {PortfolioStyles} from "../styles/PortfolioStyles";

interface INftGalleryProps {
    address: string;
}

export const NftGallery = ({address}: INftGalleryProps) => {


    const [nfts, setNfts] = useState<INft[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const getNftsData = async () => {
        setNfts([])
        setLoading(false)
        if (validateAddress(address)) {
            setLoading(true)
            const data = await getNfts(address)
            setNfts(data)
            setLoading(false)
        }
    }


    useEffect(() => {
        getNftsData()
    }, [address])


    return <div className={NftGalleryStyles.container}>
        {!loading && nfts.length > 0 && nfts.map((nftObject) => <NftCard contractAddress={nftObject.contractAddress}
                                                                         tokenId={nftObject.tokenId}
                                                                         name={nftObject.name}
                                                                         imageUrl={nftObject.imageUrl}
                                                                         key={1}/>)}
        {!loading && nfts.length === 0 && <span className={PortfolioStyles.empty}>{'You don\'t have NFTs yet'}</span>}
        {loading && <span>{'Loading...'}</span>}
    </div>
}
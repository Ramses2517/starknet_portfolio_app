import {Card} from "antd";
import {useEffect, useState} from "react";
import {getNftContract} from "../utils/getNftContract";
import emptyImage from "../pics/emptyImage.png"
import {ExplorerLink} from "./ExplorerLink";
import {NftGalleryStyles} from "../styles/NftGalleryStyles";

interface INftCardProps {
    contractAddress: string;
    tokenId: string;
    name: string | null;
    imageUrl: string | null;
}


export const NftCard = ({contractAddress, tokenId, name, imageUrl}: INftCardProps) => {

    const [collectionName, setCollectionName] = useState<string>('')

    const getCollectionName = async () => {
        setCollectionName('')
        const collectionMetadata = await getNftContract(contractAddress)
        setCollectionName(collectionMetadata?.name || "")
    }

    useEffect(() => {
        getCollectionName()
    }, [contractAddress])
    const {Meta} = Card;

    return <ExplorerLink value={`${contractAddress}/${tokenId}`} type={'nft'}><Card
        hoverable
        style={{width: 240}}
        bordered={true}
        cover={<img className={NftGalleryStyles.imageWrapper} alt={emptyImage} src={imageUrl || emptyImage}></img>}
    >
        <Meta title={name}
              description={<ExplorerLink value={contractAddress} type={'nftContract'}>{collectionName}</ExplorerLink>}/>
    </Card></ExplorerLink>
}
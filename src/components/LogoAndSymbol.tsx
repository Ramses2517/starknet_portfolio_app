import {LogoAndSymbolStyles} from "../styles/LogoAndSymbolStyles";
import emptyLogo from "../pics/emptyLogo.png"

interface ILogoAndSymbolProps {
    symbol: string,
    logoUrl: string | null
}

export const LogoAndSymbol = ({symbol, logoUrl}: ILogoAndSymbolProps) => {

    return <div className={LogoAndSymbolStyles.container}>
        <div className={LogoAndSymbolStyles.imageBox}><img className={LogoAndSymbolStyles.imageWrapper}
                                                           alt={emptyLogo} src={logoUrl || emptyLogo}/></div>
        <span className={LogoAndSymbolStyles.textWrapper}>{symbol}</span>
    </div>

}
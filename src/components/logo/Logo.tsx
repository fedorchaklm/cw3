import {FC} from "react";
import './Logo.css';

type LogoType = {
    img: string;
    alt: string;
}

export const Logo: FC<LogoType> = ({img, alt}) => {
    return (
        <>
            <img className="logo" src={img} alt={alt} />
        </>
    )
}

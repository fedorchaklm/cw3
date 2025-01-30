import {FC} from "react";
import {useSearchParams} from "react-router";

type TagType = {
    tag: string;
};

export const Tag: FC<TagType> = ({tag}) => {
    const [query, setQuery] = useSearchParams();
    const handleOnClick = () => {
        setQuery({...Object.fromEntries(query.entries()), page: '1', tag: tag});
    }

    return (
        <button className='border-gray-500 border-2 px-0.5' onClick={handleOnClick}>#{tag}</button>
    );
}
import {FC} from "react";
import {useSearchParams} from "react-router";
import './Tag.css';

type TagType = {
    tag: string;
};

export const Tag: FC<TagType> = ({tag}) => {
    const [query, setQuery] = useSearchParams();
    const handleOnClick = () => {
        setQuery({...Object.fromEntries(query.entries()), page: '1', tag: tag});
    }

    return (
        <button className={query.get('tag') === tag ? 'tagBtn active' : 'tagBtn'} onClick={handleOnClick}>#{tag}</button>
    );
}
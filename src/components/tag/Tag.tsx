import {FC} from "react";

type TagType = {
    tag: string;
};

export const Tag: FC<TagType> = ({tag}) => {
    return (
        <button className='border-gray-500 border-2 px-0.5'>#{tag}</button>
    );
}
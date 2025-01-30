import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {Loading} from "../loading/Loading.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {tagsSliceActions} from "../../redux/tags-slice/tagsSlice.ts";

export const Tags = () => {
   const {tags} = useAppSelector(({tagsSlice}) => tagsSlice )
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(tagsSliceActions.loadTags());
    }, [tags]);

     return (
         tags === null ? <Loading/> :
        <div className='flex flex-wrap gap-1 px-2'>
            {tags.map((tag: string) => <button key={tag} className='border-gray-500 border-2 px-0.5'>#{tag}</button>)}
        </div>
    );
}
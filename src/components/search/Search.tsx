import {useForm} from "react-hook-form";
import {FC} from "react";
import './Search.css';

type SearchDataType = {
    search: string
};

type SearchType = {
    onSubmit: (searchData: SearchDataType) => void;
};

export const Search: FC<SearchType> = ({onSubmit}) => {
    const {register, handleSubmit, reset} = useForm<SearchDataType>({
        mode: 'all'
    });

    const submit = (searchData: SearchDataType) => {
        onSubmit(searchData);
        reset();
    };

    return (
        <form className='search' onSubmit={handleSubmit(submit)}>
            <label htmlFor='search' className='search-label'>Search</label>
            <div className='relative'>
                <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                    <img className='search-img' src='/assets/search.svg' alt='Search'/>
                </div>
                <input type='search' id='search' placeholder='Search...' {...register('search')} required/>
                <button type='submit' className='searchBtn'>Search</button>
            </div>
        </form>
    );
}
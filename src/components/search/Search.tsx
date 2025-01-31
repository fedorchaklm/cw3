import './Search.css';
import {useForm} from "react-hook-form";
import {FC} from "react";

type searchDataType = {
    search: string
};

type SearchType = {
    onSubmit: (searchData: searchDataType) => void;
};

export const Search: FC<SearchType> = ({onSubmit}) => {
    const {register, handleSubmit, reset} = useForm<searchDataType>({
        mode: 'all'
    });

    const submit = (searchData: searchDataType) => {
        onSubmit(searchData);
        reset();
    };

    return (
        <form className='search' onSubmit={handleSubmit(submit)}>
            <label htmlFor='search' className='search-label'>Search</label>
            <div className='relative'>
                <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                    <img className='w-5 h-5 text-gray-500' src='/assets/search.svg' alt='Search'/>
                </div>
                <input type='search' id='search' placeholder='Search...' {...register('search')} required/>
                <button type='submit' className='searchBtn'>Search</button>
            </div>
        </form>
    );
}
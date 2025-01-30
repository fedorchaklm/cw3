import './Search.css';

export const Search = () => {
    return (
        <form className='search'>
            <label htmlFor='search'>Search</label>
            <div className='relative'>
                <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                    <img className='w-5 h-5 text-gray-500' src='/assets/search.svg' alt='Search' />
                </div>
                <input type='search' id='search' placeholder='Search...' required/>
                <button type='submit' className='searchBtn'>Search</button>
            </div>
        </form>
    );
}
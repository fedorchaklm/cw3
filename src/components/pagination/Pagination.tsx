import {FC} from "react";
import {useSearchParams} from "react-router";
import './Pagination.css';

type PaginationType = {
    maxPages: number;
}

export const Pagination: FC<PaginationType> = ({maxPages}) => {
    const [query, setQuery] = useSearchParams({page: '1'});
    const currentPage = Number(query.get('page'));

    const handleOnClickPrev = () => {
        const newPageValue = currentPage - 1;
        setQuery({
            ...Object.fromEntries(query.entries()),
            page: newPageValue < 1 ? '1' : newPageValue.toString()
        });
    }

    const handleOnClickNext = () => {
        const newPageValue = currentPage + 1;
        setQuery({
            ...Object.fromEntries(query.entries()),
            page: newPageValue >= maxPages ? maxPages.toString() : newPageValue.toString()
        });
    }

    return (
        <div className='flex flex-row justify-center items-center gap-2 my-5'>
            <button className={currentPage <= 1 ? 'disabledPaginationBtn' : 'paginationBtn'}
                    onClick={handleOnClickPrev}>prev
            </button>
            <p className='text-2xl'>{currentPage}/{maxPages}</p>
            <button className={currentPage >= maxPages ? 'disabledPaginationBtn' : 'paginationBtn'}
                    onClick={handleOnClickNext}>next
            </button>
        </div>
    );
}
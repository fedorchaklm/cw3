import {FC, useEffect} from "react";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import IUser from "../../models/IUser.ts";
import {User} from "../user/User.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {Pagination} from "../pagination/Pagination.tsx";
import {useSearchParams} from "react-router";
import {getMaxPages} from "../../helpers/helpers.ts";
import {Loading} from "../loading/Loading.tsx";
import {limitOfUsersByPage} from "../../constants/constants.ts";
import {Search} from "../search/Search.tsx";
import {NotFound} from "../not-found/NotFound.tsx";
import {searchDataType} from "../../models/SearchDataType.ts";
import {userSliceActions} from "../../redux/user-slice/userSlice.ts";
import './UserList.css';

export const UsersList: FC = () => {
    const {users} = useAppSelector(({userSlice}) => userSlice);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();

    const onSubmit = (searchData: searchDataType) => {
        console.log('>', searchData);
        setQuery({q: searchData.search, page: '1'});
    };

    useEffect(() => {
        const page = query.get('page') || '1';
        const q = query.get('q') || '';
        dispatch(userSliceActions.loadUsers({page: Number(page), searchParam: q}));
    }, [query]);

    return (
        users === null ? <Loading/> :
            <div className='list-wrap'>
                <Search onSubmit={onSubmit}/>
                {users && users.users.length > 0 ?
                    <div className='flex flex-col items-center gap-2 my-2 w-1/3'>
                        <h1 className='text-3xl text-white'>Users:</h1>
                        {users.users.map((user: IUser) => <User key={user.id} user={user}/>)}
                        <Pagination maxPages={getMaxPages(users.total, limitOfUsersByPage)}/>
                    </div>
                    : <NotFound/>}
            </div>
    );
}
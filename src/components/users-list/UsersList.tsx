import {FC, useEffect} from "react";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import IUser from "../../models/IUser.ts";
import {User} from "../user/User.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {usersSliceActions} from "../../redux/users-slice/usersSlice.ts";
import {Pagination} from "../pagination/Pagination.tsx";
import {useSearchParams} from "react-router";
import {getMaxPages} from "../../helpers/helpers.ts";
import {Loading} from "../loading/Loading.tsx";
import {limitOfUsersByPage} from "../../constants/constants.ts";
import {Search} from "../search/Search.tsx";

export const UsersList: FC = () => {
    const {users} = useAppSelector(({usersSlice}) => usersSlice);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();

    useEffect(() => {
        const page = query.get('page') || '1';
        dispatch(usersSliceActions.loadUsers(Number(page)));
    }, [query]);

    return (
        users === null ? <Loading/> :
            <div className='flex flex-col items-center gap-2 my-4'>
                <Search/>
                <h1 className='text-3xl'>Our users:</h1>
                {users && users.users.map((user: IUser) => <User key={user.id} user={user}/>)}
                <Pagination maxPages={getMaxPages(users.total, limitOfUsersByPage)}/>
            </div>
    );
}
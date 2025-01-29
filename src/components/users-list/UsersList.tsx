import {FC, useEffect} from "react";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import IUser from "../../models/IUser.ts";
import {User} from "../user/User.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {usersSliceActions} from "../../redux/users-slice/usersSlice.ts";
import {Pagination} from "../pagination/Pagination.tsx";
import {useSearchParams} from "react-router";

export const UsersList: FC = () => {
    const {users} = useAppSelector(({usersSlice}) => usersSlice);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();

    useEffect(() => {
        const page = query.get('page') || '1';
        dispatch(usersSliceActions.loadUsers(Number(page)))
    }, [query]);


    return (
        <div className='flex flex-col items-center gap-2 my-4'>
            {users.map((user: IUser) => <User key={user.id} user={user}/>)}
            <Pagination maxPages={7}/>
        </div>
    )
}
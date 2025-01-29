import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useEffect} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {userSliceActions} from "../../redux/user-slice/userSlice.ts";
import {useSearchParams} from "react-router";

export const UserDetails = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const {user} = useAppSelector(({userSlice}) => userSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(userSliceActions.loadUser(id));
        }
    }, [id]);

    return (
        <>
            {user && user.username}
        </>
    )
}
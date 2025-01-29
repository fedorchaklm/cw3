import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {UsersList} from "../../components/users-list/UsersList.tsx";

export const UsersPage = () => {
    const {user} = useAppSelector(({userSlice}) => userSlice);

    if (!user) return;

    return (
        <UsersList/>
    )
}
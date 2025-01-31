import {UserDetails} from "../../components/user-details/UserDetails.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {Link} from "react-router";
import './UserPage.css';

export const UserPage = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    if (!currentUser) {
        return (
            <p>You need to authenticate
                <Link className='text-gray-500 hover:underline' to='/login'>Login</Link>
            </p>
        );
    }

    return (
        <div className='user-page'>
            <UserDetails/>
        </div>
    );
}
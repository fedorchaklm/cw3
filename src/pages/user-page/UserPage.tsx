import {UserDetails} from "../../components/user-details/UserDetails.tsx";
import {FC} from "react";
import './UserPage.css';

export const UserPage: FC = () => {

    return (
        <div className='user-page'>
            <UserDetails/>
        </div>
    );
}
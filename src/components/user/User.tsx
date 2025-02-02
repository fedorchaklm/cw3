import IUser from "../../models/IUser.ts";
import {FC} from "react";
import {Link} from "react-router";
import './User.css';

type UserType = {
    user: IUser;
};

export const User: FC<UserType> = ({user}) => {

    return (
        <Link to={`/users/${user.id}`} className='user'>
            <p>{user.id} {user.firstName} {user.lastName}</p>
        </Link>
    );
}
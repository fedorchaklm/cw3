import IUser from "../../models/IUser.ts";
import {FC} from "react";

type UserType = {
    user: IUser;
}

export const User: FC<UserType> = ({user}) => {
    return (
        <div className='flex flex-col items-center gap-2 border-solid border-orange-500 border-2 py-2 px-2 mb-3 w-1/3'>
            <p>{user.id} {user.firstName} {user.lastName}</p>
        </div>
    )
}
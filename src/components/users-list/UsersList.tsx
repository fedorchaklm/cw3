import {FC} from "react";

export const UsersList: FC = () => {

    return (
        <div className='flex flex-col gap-2'>
            {/*{users.map((user:IUser) => <User key={user.id} user={user}/> )}*/}
            users
        </div>
    )
}
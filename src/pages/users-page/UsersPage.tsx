import {UsersList} from "../../components/users-list/UsersList.tsx";

export const UsersPage = () => {
    // const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);
    //
    // if (!currentUser) {
    //     return (
    //         <p>You need to authenticate
    //             <Link className='text-gray-500 hover:underline' to='/login'>Login</Link>
    //         </p>
    //     );
    // }

    return (
        <div className='bg-[url(/assets/cake.jpg)] bg-center bg-cover bg-fixed'>
        <UsersList/>
        </div>
    );
}


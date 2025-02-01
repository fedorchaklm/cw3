import {Link} from 'react-router';
import {FC, PropsWithChildren} from "react";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";

type ProtectedRouteType = {
    children: PropsWithChildren;
}
export const ProtectedRoute: FC<ProtectedRouteType> = ({children}) => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    if (!currentUser) {
        return (
            <div className='bg-white text-black text-3xl w-fit px-4 py-4 rounded-xl'>
                <p>You need to authenticate</p> <Link className='text-gray-500 hover:underline' to='/login'>Login</Link>
            </div>
        );
    }

    return <>{children}</>;
};
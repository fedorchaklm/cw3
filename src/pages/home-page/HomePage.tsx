import {Menu} from "../../components/menu/Menu.tsx";
import {Link, Outlet} from "react-router";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {Logo} from "../../components/logo/Logo.tsx";

export const HomePage = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    if (!currentUser) return <p>You need to authenticate <Link className='text-gray-500 hover:underline'
                                                        to='/login'>Login</Link></p>;

    return (
        <>
            {currentUser &&
                <div>
                    <div className='flex justify-between px-4 bg-black text-white w-full'>
                        <Menu/>
                        <Logo img={currentUser.image} alt={currentUser.lastName}/>
                    </div>
                    <Outlet/>
                </div>
            }
        </>
    )
}
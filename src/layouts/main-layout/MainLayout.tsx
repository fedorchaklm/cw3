import {Link, Outlet} from "react-router";
import {Menu} from "../../components/menu/Menu.tsx";
import {Logo} from "../../components/logo/Logo.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import './MainLayout.css';

export const MainLayout = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    console.log(currentUser);
    if (!currentUser) {
        return (
            <div
                className='flex items-center gap-4 m-auto my-60 bg-white text-black text-3xl w-fit px-4 py-4 rounded-xl'>
                <p>You need to authenticate</p><Link className='text-gray-500 hover:underline' to='/login'>Login</Link>
            </div>
        );
    }

     return (
        <>
            <div className='flex justify-between px-4 bg-black text-white w-full'>
                <Menu/>
                <Logo img={currentUser.image} alt={currentUser.lastName}/>
            </div>
            <div className='flex justify-center'>
                <Outlet/>
            </div>
        </>
    );
}
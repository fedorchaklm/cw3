import {Outlet} from "react-router";
import {Menu} from "../../components/menu/Menu.tsx";
import {Logo} from "../../components/logo/Logo.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import './MainLayout.css';

export const MainLayout = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    return (
        <>
            {currentUser && <div className='flex justify-between px-4 bg-black text-white w-full'>
                <Menu/>
                <Logo img={currentUser.image} alt={currentUser.lastName}/>
            </div>}
            <Outlet/>
        </>
    )
        ;
}
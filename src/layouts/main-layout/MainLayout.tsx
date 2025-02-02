import {Outlet} from "react-router";
import {Menu} from "../../components/menu/Menu.tsx";
import './MainLayout.css';

export const MainLayout = () => {

    return (
        <>
            <Menu/>
            <div className='flex justify-center'>
                <Outlet/>
            </div>
        </>
    );
}
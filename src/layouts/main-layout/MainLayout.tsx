import {Outlet} from "react-router";
import {Menu} from "../../components/menu/Menu.tsx";
import {Logo} from "../../components/logo/Logo.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import './MainLayout.css';
import {ProtectedRoute} from "../../components/protected-router/ProtectedRouter.tsx";

export const MainLayout = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    return (currentUser &&
        <ProtectedRoute>
            <Menu/>
            <Logo img={currentUser.image} alt={currentUser.lastName}/>
            <Outlet/>
        </ProtectedRoute>
    );
}
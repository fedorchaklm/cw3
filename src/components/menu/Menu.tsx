import {Link} from "react-router";
import './Menu.css';
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {Logo} from "../logo/Logo.tsx";

export const Menu = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    if (!currentUser) {
        return (
            <ul className='menu'>
                <li className='menu-item'>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        );
    }

    return (
        <div className='flex items-center justify-between'>
            <ul className='menu'>
                <li className='menu-item'>
                    <Link to='/login'>Login</Link>
                </li>
                <li className='menu-item'>
                    <Link to='/users'>Users</Link>
                </li>
                <li className='menu-item'>
                    <Link to='/recipes'>Recipes</Link>
                </li>
            </ul>
            <div className='px-4'>
                <Logo img={currentUser.image} alt={currentUser.lastName}/>
            </div>
        </div>
    );
}
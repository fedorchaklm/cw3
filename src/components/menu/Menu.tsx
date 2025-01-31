import {Link} from "react-router";
import './Menu.css';

export const Menu = () => {
    return (
        <ul className='menu'>
            <li className='menu-item'>
                <Link to='/'>Home</Link>
            </li>
            <li className='menu-item'>
                <Link to='/users'>Users</Link>
            </li>
            <li className='menu-item'>
                <Link to='/recipes'>Recipes</Link>
            </li>
        </ul>
    );
}
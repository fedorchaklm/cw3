import {Link} from "react-router";
import './Menu.css';

export const Menu = () => {
    return (
        <ul className='flex justify-center gap-2 w-fit'>
            <li className='btn'>
                <Link to='/'>Home</Link>
            </li>
            <li className='btn'>
                <Link to='/users'>Users</Link>
            </li>
            <li className='btn'>
                <Link to='/recipes'>Recipes</Link>
            </li>
        </ul>
    );
}
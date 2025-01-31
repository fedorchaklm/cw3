import {Link} from "react-router";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import './HomePage.css';

export const HomePage = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    if (!currentUser) {
        return (
            <p>You need to authenticate
                <Link className='text-gray-500 hover:underline' to='/login'>Login</Link>
            </p>
        );
    }

    return (
        currentUser &&
        <div className="home-page"></div>
    );
}

// <div className="bg-[url(/assets/burger.jpg)] bg-center bg-cover min-h-screen"></div>

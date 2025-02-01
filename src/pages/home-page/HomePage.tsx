import {Link} from "react-router";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import './HomePage.css';

export const HomePage = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    return (
        <div className="home-page">
            {!currentUser &&
                <div className='bg-white text-black text-3xl w-fit px-4 py-4 rounded-xl'>
                    <p>You need to authenticate <Link className='text-gray-500 hover:underline' to='/login'>Login</Link>
                    </p>
                </div>
            }
        </div>
    );
}

// <div className="bg-[url(/assets/burger.jpg)] bg-center bg-cover min-h-screen"></div>

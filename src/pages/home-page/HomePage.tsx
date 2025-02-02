import './HomePage.css';
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";

export const HomePage = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    console.log(currentUser);

    return (
        currentUser ?
            <div className='home-page'>
                <img src={'/assets/burger.jpg'} alt='burger'/>
                <h1>Welcome to our site – Ultimate Recipe Collection!</h1>
                <p className='text-2xl'>Looking for delicious recipes? You’ve come to the right place! Here
                    you’ll
                    find a
                    collection of
                    mouthwatering recipes and chefs sharing their passion for food.</p>
            </div> :
            <p className='my-40 bg-white text-black text-3xl px-4 py-4 rounded-xl text-center'>You
                need to authenticate</p>
    );
}


import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {FC} from "react";
import './HomePage.css';

export const HomePage: FC = () => {
    const {currentUser} = useAppSelector(({currentUserSlice}) => currentUserSlice);

    return (
        currentUser ?
            <div className='home-page'>
                <img src={'/assets/burger.jpg'} alt='burger'/>
                <h1>Welcome to our site – Ultimate Recipe Collection!</h1>
                <p className='text-2xl'>Looking for delicious recipes? You’ve come to the right place! Here you’ll find
                    a collection of mouthwatering recipes and chefs sharing their passion for food.</p>
            </div> :
            <p className='info'>You
                need to authenticate</p>
    );
}


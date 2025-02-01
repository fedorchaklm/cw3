import './HomePage.css';

export const HomePage = () => {

    return (
        <div className="home-page">
            <img src={'/assets/burger.jpg'} alt='burger'/>
            <h1>Welcome to our site – Ultimate Recipe Collection!</h1>
            <p className='text-2xl'>Looking for delicious recipes? You’ve come to the right place! Here you’ll find a
                collection of
                mouthwatering recipes and chefs sharing their passion for food.</p>
        </div>
    );
}


import React, { useContext } from 'react';
import { AuthContext } from './authprovider/AuthProvider';

const Home = () => {
    const {user} = useContext(AuthContext)
    // console.log(user.photoURL.length)
    return (
        <div>
            <h2 className='text-2xl'>Home</h2>
        </div>
    );
};

export default Home;
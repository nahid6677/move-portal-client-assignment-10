import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Main = () => {
    return (
        <div className='container mx-auto border'>
            <Navbar></Navbar>
            <h2 className='text-2xl'>Main</h2>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;
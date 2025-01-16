import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="text-center space-y-6">
                <h1 className="text-9xl font-extrabold text-primary">404</h1>
                <h2 className="text-4xl font-bold ">Oops! Page Not Found</h2>
                <p className="text-gray-400">
                    Sorry, the page you are looking for doesn't exist or has been moved.
                </p>
                <Link to={"/"} className="btn btn-primary">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authprovider/AuthProvider';
import Loading from '../Loading';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {loading,user} = useContext(AuthContext);
    if(loading){
        return <Loading></Loading>
    };
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to={"/login"}></Navigate>
};

export default PrivateRoute;
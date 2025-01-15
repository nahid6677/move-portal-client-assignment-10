import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './authprovider/AuthProvider';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Login = () => {
    const {signIn} = useContext(AuthContext);
    const [hide, setHide] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const handleLogin = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email,password)
        signIn(email,password)
        .then(result =>{
            // console.log(result.user)
            if(result.user.uid) {
                toast.success("Login Successfull")
                navigate(location?.state ? location.state : "/")
            }
        })
        .catch(err => console.log(err))


    }
    const handleShow = () =>{
        setHide(!hide);
    }
    return (
        <div className="card mx-auto mt-5 sm:mt-20 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={hide? 'text': 'password'} name='password' placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <Link to={'/forgat'}><a className="label-text-alt link link-hover">Forgot password?</a></Link>
                    </label>
                    <button onClick={handleShow} type='button' className='absolute left-56 top-14'>{hide ? <FaRegEye className='pb-1'/> : <FaRegEyeSlash className='pb-1'/>}</button>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
            <a>I don't have an account <Link className=' font-bold text-green-400' to={"/signup"}>Ragister</Link></a>
        </div>
    );
};

export default Login;
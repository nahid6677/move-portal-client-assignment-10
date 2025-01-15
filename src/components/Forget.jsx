import React, { useContext } from 'react';
import { AuthContext } from './authprovider/AuthProvider';

const Forget = () => {
    const {forgotEmail,setLoading} = useContext(AuthContext);
    const handlewForgot = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        forgotEmail(email)
        .then(() => {
            // console.log(result);
            e.target.reset()
            setLoading(false)
            alert('Check your inbox')
        })
        .catch(err =>{
            console.log(err)
        })
        
    }
    return (
        <div className="card mx-auto mt-5 sm:mt-20 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handlewForgot} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Enter your email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Get code</button>
                </div>
            </form>
        </div>
    );
};

export default Forget;
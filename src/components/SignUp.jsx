import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './authprovider/AuthProvider';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from 'firebase/auth';

const SignUp = () => {
    const { signUpNew, updateUserProfile, pupUpSignIn, setLoading } = useContext(AuthContext)
    const [hide, setHide] = useState(false)
    const navigate = useNavigate();
    // const provider = new GoogleAuthProvider();
    const continueGoogle = () => {
        pupUpSignIn()
            .then(result => {
                console.log(result.user)
                if (result.user.uid) {
                    navigate(location?.state ? location.state : "/")
                    setLoading(false)
                    // console.log(result.user.uid)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        // const user = { name, email, password }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            toast.warning("Password must be at least 6 characters long, include one uppercase letter and one number.");
        } else {
            try {
                signUpNew(email, password)
                    .then(result => {
                        if (result?.user?.uid) {
                            toast.success("Ragister Successfully!")
                            updateUserProfile({ displayName: name, photoURL: photo })
                                .then(() => {
                                    navigate(location?.state ? location.state : "/")
                                })
                        }
                        console.log(result.user)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

    }
    const handleShow = () => {
        setHide(!hide);
    }
    return (
        <div className="card mx-auto mt-5 sm:mt-20 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="text" name='photo' placeholder="photo url" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control ">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <div className="relative w-full">
                        <input type={hide ? 'text' : 'password'} name='password' placeholder="password" className="input w-full input-bordered" required />
                        <button onClick={handleShow} type='button' className='absolute right-4 top-4'>{hide ? <FaRegEye className='pb-1' /> : <FaRegEyeSlash className='pb-1' />}</button>
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Ragister</button>
                </div>
            </form>
            <a className='text-center'>I have an account <Link className=' font-bold text-green-400' to={"/login"}>Login</Link></a>
            <button type='button' onClick={continueGoogle} className='btn mx-7 my-6'><span className='flex items-center font-bold gap-2'><FcGoogle /> Continue with google</span></button>
        </div>
    );
};

export default SignUp;
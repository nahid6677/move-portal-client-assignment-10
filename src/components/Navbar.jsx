import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from './authprovider/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const links = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/"}>All Movies</NavLink></li>
        <li><NavLink to={"/addmovie"}>Add Movie</NavLink></li>
        <li><NavLink to={"/"}>My Favorites </NavLink></li>
    </>
    const handleLogOut = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "Now log out your account!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out!"
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(result)
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Yes!",
                            text: "Log out successfull.",
                            icon: "success"
                        });
                    })
                    .catch(err => { console.log(err) })


            }
        });
    }
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm gap-1 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <Link to={"/"}><a className=" text-xl"><img src={`https://cdn.bongo-solutions.com/icons/bongo-circle-logo.svg`} alt="" /></a></Link>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu gap-3 menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="flex items-center gap-1"><button onClick={handleLogOut} className='btn'>Log Out</button> {user?.photoURL && <div className="relative group "><img className={`w-10 rounded-full h-10 object-cover`} src={user?.photoURL} alt="" /> <p className=' absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300'>{user?.displayName}</p></div>}</div> : <div className="flex gap-1"><Link to={"/signup"}><a className="btn ">Register</a></Link> <Link to={"/login"}><a className="btn ">Log In</a></Link></div>
                }
            </div>
        </div>
    );
};

export default Navbar;
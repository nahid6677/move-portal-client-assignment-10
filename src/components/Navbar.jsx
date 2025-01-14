import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const links = <>
    <li className={'bg-white text-red-400'}><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/"}>Home 2</NavLink></li>
    <li><NavLink to={"/"}>Home 3</NavLink></li>
    </>
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
                {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu gap-3 menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn bg-slate-50">P</a>
            </div>
        </div>
    );
};

export default Navbar;
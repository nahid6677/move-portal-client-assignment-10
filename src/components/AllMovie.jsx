import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './authprovider/AuthProvider';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IoSearch } from 'react-icons/io5';
// import { Rating } from 'react-simple-star-rating';

const AllMovie = () => {
    const { user } = useContext(AuthContext)
    const [hover, setHover] = useState(false)
    const [search, setSearch] = useState('')
    const loadedMovies = useLoaderData();
    const [movies, setMovies] = useState(loadedMovies);

    useEffect(() => {
        fetch(`https://move-portal-server-assignment-10.vercel.app/movies?searchParams=${search}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data)
            })
    }, [search])
    return (
        <div className='w-10/12 mx-auto '>
            <div className="flex justify-center my-5">
                <div className="relative">
                    <input type="text" placeholder='Search' onChange={(e) => setSearch(e.target.value)} className='input px-5 bg-slate-700 ' />
                    <IoSearch className='absolute top-4 left-48' />
                </div>
            </div>
            <div className="w-full grid overflow-hidden gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ">
                {
                    movies.map(movie => <div key={movie._id} className="card my-5 mx-auto card-compact bg-base-200 pt-5 sm:w-80 shadow-xl">
                        <figure>
                            <img className='rounded-md h-48'
                                src={movie.poster}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{movie.title}</h2>
                            <div className="flex w-full items-center justify-between">
                                <p className='text-lg'>{movie.genre}</p>
                                <p className='text-end text-lg'>Duration: {movie.duration} min</p>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <p className='text-lg'>Release Year {movie.year}</p>
                                <p className='text-end text-lg'>Rating: {movie.rating}</p>
                            </div>

                            <div className="card-actions justify-end flex mt-5 items-center">
                                <Link to={`/seedetails/${movie._id}`}>
                                    <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={`btn-sm rounded font-bold bg-slate-700 `}>See Details <FontAwesomeIcon className={`ml-1 text-blue-500 transition-transform duration-300 ${hover ? 'rotate-0' : '-rotate-45'}`} icon={faArrowRight} /></button>
                                </Link>
                            </div>

                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};


export default AllMovie;
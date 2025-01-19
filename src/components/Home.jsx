import React, { useContext, useState } from 'react';
import { AuthContext } from './authprovider/AuthProvider';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { Rating } from 'react-simple-star-rating';

const Home = () => {
    const { user } = useContext(AuthContext)
    const [hover, setHover] = useState(false)
    const movies = useLoaderData();




    return (
        <div className='w-10/12 mx-auto'>
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

export default Home;
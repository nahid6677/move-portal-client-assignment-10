import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Slider from "./Slider";


const Home = () => {
    const loadedMovies = useLoaderData();
    const [hover, setHover] = useState(false)
    const [Movies, setMovies] = useState(loadedMovies)
    return (
        <div className="w-full mx-auto ">
            <div className="slider bg-base-100 w-full ">
                <Slider Movies={Movies}></Slider>
            </div>
            <div className="w-10/12 mx-auto grid overflow-hidden gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {
                    Movies.map(movie => <div key={movie._id} className="card my-5 mx-auto card-compact bg-base-200 pt-5 sm:w-80 shadow-xl">
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
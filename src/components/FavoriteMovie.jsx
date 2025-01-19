import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const FavoriteMovie = () => {
    // const allMovies = useLoaderData();
    const [movies, setMovies] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/favorite")
            .then(res => res.json())
            .then(data => {
                setMovies(data)
            })
    }, [])
    const handleDeleteFavList = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete from favourite list",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/favorite/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        if (data.deletedCount > 0) {
                            setMovies(movies.filter(mov => mov._id !== id))
                            toast.success("Delete successfully from favorite list")
                        }
                    })
            }
        });
    }
    return (
        <div className='w-10/12 mx-auto'>
            <div className="w-full grid overflow-hidden gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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

                            <div className="card-actions justify-center flex mt-5 items-center">
                                <button onClick={() => handleDeleteFavList(movie._id)} type='button' className='btn bg-slate-700'>Delete Favorite List</button>
                            </div>

                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default FavoriteMovie;
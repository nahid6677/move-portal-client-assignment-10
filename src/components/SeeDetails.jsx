import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from './authprovider/AuthProvider';
import { faL } from '@fortawesome/free-solid-svg-icons';
const SeeDetails = () => {
    const { favoriteMovies, setFavoriteMovies,user } = useContext(AuthContext);
    // useEffect(() => {
    //     fetch(`https://move-portal-server-assignment-10.vercel.app/favorite`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setFavoriteMovies(data)
    //         })
    // }, [])
    // const [add, setAdd] = useState(false)
    const singleMove = useLoaderData();
    const navigate = useNavigate()

    const handleFavotite = () => {
        const { poster, title, genre, duration, year, rating, summary } = singleMove;
        const email = user.email;
        const favMovie = { poster, title, genre, duration, year, rating, summary,email}
        fetch(`https://move-portal-server-assignment-10.vercel.app/favorite`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(favMovie)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success("Movie added in the favorite list");
                }
                if(data.title){
                    toast.warning("Movie already exist in the favorite list.");
                };
            })

    }
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://move-portal-server-assignment-10.vercel.app/movies/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            navigate("/");
                            toast.success("Delete Successfully!")
                        }
                    })
            }
        });


    }

    return (
        <div className="w-11/12 mx-auto">
            <div className="card card-compact bg-base-100 mx-auto w-3/5 xl:w-2/5 shadow-xl">
                <figure>
                    <img className='rounded-xl'
                        src={singleMove.poster}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-bold text-xl">Title: {singleMove.title}</h2>
                    <p className='text-xl'>Genre: {singleMove.genre}</p>
                    <p className='text-xl'>Duration: {singleMove.duration} min</p>
                    <p className='text-xl'>Release Year {singleMove.year}</p>
                    <p className='text-xl'>Rating: {singleMove.rating}</p>
                    <p className='text-xl'>Summary: {singleMove.summary}</p>
                    <div className="card-actions flex md:flex-row flex-col justify-between my-5">
                        <Link to={"/"}><button className="btn bg-slate-700">All Movies</button></Link>
                        <button onClick={() => handleDelete(singleMove._id)} className="btn bg-slate-700">Delete</button>
                        <button onClick={handleFavotite} className="btn bg-slate-700">Add Favorites</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeeDetails;
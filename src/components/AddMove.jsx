import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './authprovider/AuthProvider';

const AddMove = () => {
    const { user } = useContext(AuthContext);
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState('');
    const genres = ['Comedy', 'Drama', 'Horror']
    const years = [2024, 2023, 2022, 2021];
    const isValidURL = (text) => {
        try {
            new URL(text);
            return true;
        } catch {
            return false;
        }
    }
    const handleAddMovie = event => {
        event.preventDefault();
        const form = event.target;
        const poster = form.poster.value;
        const title = form.title.value;
        const duration = form.duration.value;
        const rating = form.rating.value;
        const summary = form.summary.value;
        const email = user.email;
        const movie = { poster, title, genre, duration, year, rating, summary, email };
        if (!isValidURL(poster)) {
            toast.warning("Provide a photo URL of movie poster");

        }
        else if (title.length < 2) {
            toast.warning("Movie title al least 2 characters")
        }
        else if (parseInt(duration) < 60) {
            toast.warning("Movie time duration al least 60 min")
        }
        else if (genre.length < 2) {
            toast.warning("Select a genre")
        }
        else if (year.length < 2) {
            toast.warning("Select the movies year")

        }
        else if (summary.length < 10) {
            toast.warning("Provide a summary at least 10 characters")
        } else {
            fetch(`http://localhost:5000/movies`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(movie)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    form.reset();
                    setGenre('');
                    setYear('')
                    toast.success(`Movie added successfull "${title}"`);
                })

        }

    }
    return (
        <div className="max-w-[520px] mx-auto">
            <form onSubmit={handleAddMovie} className="card-body">
                <div className="sm:flex gap-3 max-w-[550px] justify-between">
                    <div className="space-y-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Movie Poster ( photo url )</span>
                            </label>
                            <input type="text" name='poster' placeholder="Enter Photo URL" className="input input-bordered " required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Duration Time (min)</span>
                            </label>
                            <input type="text" name='duration' placeholder="Enter Duration Time" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Genre</span>
                            </label>
                            <select className='select select-bordered w-full' name="genre" value={genre} onChange={e => setGenre(e.target.value)} id="">
                                <option value="" disabled>Select Genre</option>
                                {
                                    genres.map((gen, idx) => <option key={idx} value={gen}>{gen}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Movie Title</span>
                            </label>
                            <input type="text" name='title' placeholder="Enter Movie Title" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Release Year</span>
                            </label>
                            <select className='select select-bordered w-full' name="releaseYear" value={year} onChange={e => setYear(e.target.value)} id="">
                                <option value={''} disabled>Select Year</option>
                                {
                                    years.map((yea, idx) => <option value={yea} key={idx}>{yea}</option>)
                                }
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Rating </span>
                            </label>
                            <input type="text" name='rating' placeholder="Enter Rating" className="input input-bordered" required />
                        </div>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Summary  </span>
                    </label>
                    <textarea name='summary' className="textarea textarea-bordered h-24" placeholder="Summary"></textarea>
                </div>

                <div className="form-control mt-6">
                    <button className="btn btn-primary">Add Movie</button>
                </div>
            </form>
        </div>
    );
};

export default AddMove;
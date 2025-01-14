import React from 'react';

const AddMove = () => {
    const handleAddMovie = event => {
        event.preventDefault();
        const form = event.target;
        const poster = form.poster.value;
        const title = form.title.value;
        const genre = form.genre.value;
        const duration = form.duration.value;
        const release = form.release.value;
        const rating = form.rating.value;
        const summary = form.summary.value;
        const movie = { poster, title, genre, duration, release, rating, summary };
        // console.log(movie)
        fetch(`http://localhost:5000/movies`,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(movie)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
    return (
        <div className="max-w-[520px] mx-auto">
            <form onSubmit={handleAddMovie} className="card-body">
                <div className="sm:flex gap-3 max-w-[550px] justify-between">
                    <div className="space-y-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Movie Poster</span>
                            </label>
                            <input type="text" name='poster' placeholder="Enter Photo URL" className="input input-bordered " required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Duration Time</span>
                            </label>
                            <input type="text" name='duration' placeholder="Enter Duration Time" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Genre </span>
                            </label>
                            <input type="text" name='genre' placeholder="Enter Genre" className="input input-bordered" required />
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
                            <input type="text" name='release' placeholder="Enter Release Year" className="input input-bordered" required />
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
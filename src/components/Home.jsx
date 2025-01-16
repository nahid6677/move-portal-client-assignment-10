import React, { useContext, useState } from 'react';
import { AuthContext } from './authprovider/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext)
    // console.log(user?.user)
    const [category, setCategory] = useState("");
    const categories = ["Fruits", "Vegetables", "Dairy"];
    const handleSubmit = e => {
        e.preventDefault();
        console.log(category)
    }
    return (
        <div className='w-10/12 mx-auto flex justify-center'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium ">
                        Catagory
                    </label>
                    <select className="select select-bordered w-full max-w-xs" name='catagoryName' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value={""} disabled>
                            Select a catagory
                        </option>
                        {
                            categories.map((a, idx) => <option key={idx} value={a}>{a}</option>)
                        }
                    </select>
                </div>
                <button type='submit' className="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
    );
};

export default Home;
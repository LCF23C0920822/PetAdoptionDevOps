import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="bg-dark text-white vh-100 d-flex flex-column justify-content-start align-items-center">
            <h1 className="mt-0">Welcome, find your new best friend here!</h1>
            <div className="my-4">
                <img 
                    src="../images/DogsAndCats.png" 
                    alt="Find Your Friend" 
                    className="img-fluid mx-auto d-block w-50"
                />
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Link to="/pets" className="btn btn-success me-3">Adopt a Pet</Link>
                <Link to="/users" className="btn btn-primary">Pet Adopter</Link>
            </div>
        </div>
    );
}

export default Home;

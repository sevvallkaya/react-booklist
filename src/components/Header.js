import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-black border-bottom border-dark py-3">
            <div className="container g-4 g-lg-5">
                <Link className="navbar-brand text-white" to="/">Book Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/add-book">Add a Book</Link>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </nav>
    );
};

export default Header;

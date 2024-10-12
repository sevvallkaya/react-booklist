
import React from 'react';

const SearchInput = ({ searchTerm, handleSearch }) => {
    return (
        <section className="mt-5 pt-5 g-4 g-lg-5">
            <h1 className="display-5 text-center text-light mb-4">
                {searchTerm ? "Filtered Books" : "Find Your Favorite Book"}
            </h1>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch} 
                className="form-control mb-4 bg-light shadow rounded-5 w-50 mx-auto"
            />
        </section>
    );
};

export default SearchInput;

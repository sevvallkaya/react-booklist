
import React from 'react';

const SearchInput = ({ searchTerm, handleSearch }) => {
    return (
        <div className="pb-5">
            <h1 className="display-5 text-center text-light mb-4">Find Your Favorite Book</h1>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch} 
                className="form-control mb-4 bg-light shadow rounded-5 w-50 mx-auto"
            />
        </div>
    );
};

export default SearchInput;

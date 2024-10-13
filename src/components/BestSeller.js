import React from 'react';
import { Link } from 'react-router-dom';

const BestSellers = ({ books, onUpdate, onDelete }) => {
    return (
        <section className="py-5 g-4 g-lg-5">
            <h2 className="display-6 text-light mb-4">Best Sellers</h2>
            <div className="row">
                {books.map(book => (
                    <div key={book.id} className="col-md-6 col-lg-3">
                        <div className="card mb-4 p-3 rounded-4 bg-dark">
                            <img src={book.image} style={{ maxHeight: '400px', width: '100%', objectFit:'cover' }} className="card-img-top rounded-3 img-fluid " alt={book.name} loading="lazy" />
                            <div className="card-body px-0">
                                <h5 className="card-title text-warning mb-0">{book.name}</h5>
                                <p className="card-text text-light mb-0"><small><span className="fw-bold">by</span> {book.author}</small></p>
                                <p className="card-text text-light fw-bold">${book.price}</p>
                                <Link to={`/books/${book.id}`} state={{book}} className="btn btn-primary w-100 mb-3">
                                    View Details
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning w-50" onClick={() => onUpdate(book.id)}>
                                        Update
                                    </button>
                                    <button className="btn btn-danger ms-2 w-50" onClick={() => onDelete(book.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BestSellers;

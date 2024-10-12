import React, { useEffect, useState } from 'react';
import { getBookById } from '../services/bookService';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [book, setBook] = useState(null);

  useEffect(() => {

    if(location.state && location.state.book){
      setBook(location.state.book);
    } else {
      getBookById(id)
      .then(response => setBook(response.data))
      .catch(error => console.log(error));
    }
    
  }, [id, location.state]);

  return book ? (
    <div className="container py-5 g-4 g-lg-5">
      <h2 className="text-warning mb-4 display-5"><span className='text-light fs-5 fw-bold pe-2'>About</span>{book.name}</h2>
      <div className="row align-items-center g-4 g-lg-5">
        <div className='col-md-4 bg-secondary p-2 rounded-3'>
        <img src={book.image} className="rounded-3 img-fluid" alt={book.name} loading="lazy" />
        </div>
        <div className='col-md-8'>
        <div className="px-0">
              <h3 className="display-4 text-warning mb-0">{book.name}</h3>
              <p className="text-light fs-5 lh-1"><small><span className="fw-bold">by</span> {book.author}</small></p>
              <p className="text-light fw-bold fs-5">${book.price}</p>
          </div>
      </div>
        </div>
    
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default BookDetails;
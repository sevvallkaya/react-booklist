import React, { useState } from 'react';
import { createBook } from '../services/bookService';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';

const BookForm = ({onAddBook}) => { 
  const [book, setBook] = useState({
    name: '',
    author: '',
    price: '',
    image: '',
    createdAt: ''
  });

  const navigate = useNavigate();
  const {addBook} = useBooks();


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBook({ ...book, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBook = {
      ...book,
      createdAt: new Date().toISOString(),
      id: Math.floor(Math.random() * 10000), 
    };

    createBook(newBook)
      .then(response => {
        console.log('Book created:', response.data);
        //onAddBook(response.data);
        addBook(response.data);
        navigate('/', {state: {newBook: response.data}});
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='container py-5 g-4 g-lg-5'>
      <div className='row'>
      <h2 className="display-6 text-light mb-5"><span className='text-light fs-5 fw-bold pe-2'>Add</span><span className='text-warning fw-semibold'>Your New Book</span></h2>
        <div className='col-lg-6 mx-auto bg-dark rounded-3 p-2 p-lg-3'>
        <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
        placeholder='Name'
          type="text"
          name="name"
          value={book.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Author</label>
        <input
        placeholder='Author'
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-success w-100 mt-3">Add Book</button>
    </form>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
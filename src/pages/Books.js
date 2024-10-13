import React, { useEffect, useState } from "react";
import { getBooks, updateBook, deleteBook, getBookById } from "../services/bookService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import BooksYouAdded from "../components/BooksYouAdded";
import BestSellers from "../components/BestSeller";
import UpdateBookModal from "../components/UpdateBookModal";
import SearchInput from "../components/SearchInput";
import BookForm from "./BookForm";
import { useBooks } from "../context/BooksContext";

const Books = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const { addedBooks, setAddedBooks, updateBookContext, deleteBookContext }= useBooks(); 
    const [allBooks, setAllBooks] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);

    useEffect(() => {
        getBooks().then(response => {
            const currentBooks = response.data; 
            console.log(response.data);
            if (location.state?.newBook) {
                const newBook = location.state.newBook;
                setAddedBooks(prevBooks => {
                    if (!prevBooks.find(book => book.id === newBook.id)) {
                        return [...prevBooks, newBook];
                    }
                    return prevBooks;
                });
            }
    
            setBooks(currentBooks); 
            setAllBooks(currentBooks); 
           
        }).catch(err => console.log(err));
    }, [location.state]);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        const combinedBooks = [...allBooks, ...addedBooks];

        if (term === '') {
            setBooks(combinedBooks);
        } else {
            const filteredBooks = combinedBooks.filter(book =>
                book.name.toLowerCase().includes(term.toLowerCase())
            );
            setBooks(filteredBooks);
        }
    };
    
    const handleAddBook = (newBook) => {
        setAddedBooks(prevBooks => [...prevBooks, newBook]); 
      };
    
      
    
    
    const handleViewDetails = (id) => {
        getBookById(id)
            .then(response => {
                const bookDetails = response.data;
                console.log("Book details:", bookDetails);
                navigate(`/books/${id}`, { state: { book: bookDetails } });
            })
            .catch(error => {
                console.error("Error fetching book details:", error);
            });
    };
      
    
    const handleUpdate = (id, updatedData) => {
        console.log("Updating book with ID:", id);
        console.log("Updated data:", updatedData);
       
        updateBookContext(id, updatedData);
    
        if (books.find(book => book.id === id)) {

            updateBook(id, updatedData)
                .then(response => {
                    setBooks(prevBooks => 
                        prevBooks.map(book => book.id === id ? { ...book, ...updatedData } : book)
                    );
                    console.log(id);
                    console.log("Book updated:", response.data);
                })
                .catch(error => console.log(error));
        } else {
            setBooks(prevBooks => [
                ...prevBooks,
                { id, ...updatedData } 
            ]);
        }
    };
    

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            
            deleteBookContext(id);
            
            if (books.find(book => book.id === id)) {
                deleteBook(id)
                    .then(() => {
                        console.log('Book deleted');
                        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
                    })
                    .catch(error => console.log(error));
            }
        }
    };
    
    
    const openModal = (bookIdOrObject) => {
        let book;

        if (typeof bookIdOrObject === 'object') {
            book = bookIdOrObject;
        } else {
            book = books.find(b => b.id === bookIdOrObject) || addedBooks.find(b => b.id === bookIdOrObject);
        }
    
        if (book) {
            console.log("Opening modal for book:", book);
            setCurrentBook(book);
            setShowModal(true);
        } else {
            console.log("Book not found:", bookIdOrObject);
        }
    };
    

    const closeModal = () => {
        setShowModal(false);
        setCurrentBook(null);
    };


    return (
        <div className="container">
            <SearchInput searchTerm={searchTerm} handleSearch={handleSearch}/>
            <div className="row">
                {searchTerm === '' && addedBooks.length > 0 && 
                    <BooksYouAdded 
                        books={addedBooks} 
                        onUpdate={openModal} 
                        onDelete={handleDelete} 
                />}
                <BestSellers 
                    books={books} 
                    onViewDetails={handleViewDetails}
                    onUpdate={openModal} 
                    onDelete={handleDelete} />
            </div>
                {currentBook && (
                    <UpdateBookModal 
                        show={showModal} 
                        handleClose={closeModal} 
                        book={currentBook} 
                        handleUpdate={handleUpdate} 
                    />
                )}
        </div>
    );
};

export default Books;



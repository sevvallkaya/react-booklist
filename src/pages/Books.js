import React, { useEffect, useState } from "react";
import { getBooks, updateBook, deleteBook } from "../services/bookService";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import BooksYouAdded from "../components/BooksYouAdded";
import BestSellers from "../components/BestSeller";
import UpdateBookModal from "../components/UpdateBookModal";
import SearchInput from "../components/SearchInput";
import BookForm from "./BookForm";

const Books = () => {
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const [addedBooks, setAddedBooks] = useState([]); 
    const [allBooks, setAllBooks] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);

    useEffect(() => {
        getBooks().then(response => {
            const currentBooks = response.data;
            console.log(response.data)
            if (location.state?.newBook) {
                const newBook = location.state.newBook;
                console.log('yeni kitap var')
                setAddedBooks(prevBooks => {
                    if (!prevBooks.find(book => book.id === newBook.id)) {
                        return [...prevBooks, newBook];
                    }
                    return prevBooks;
                });
            }
    
            setBooks(currentBooks); 
            console.log(currentBooks);
            setAllBooks(currentBooks); 
        }).catch(err => console.log(err));
    }, [location.state]);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
    
        if (term === '') {
            setBooks([...allBooks, ...addedBooks]);
        } else {
            const filteredBooks = allBooks.filter(book =>
                book.name.toLowerCase().includes(term.toLowerCase())
            );
            setBooks(filteredBooks);
        }
    };

    const handleAddBook = (newBook) => {
        setAddedBooks(prevBooks => [...prevBooks, newBook]); // Yeni kitabı mevcut kitaplardaki diziye ekliyoruz
      };

    const handleUpdate = (id, updatedData) => {
        updateBook(id, updatedData)
            .then(response => {
                setBooks(prevBooks => 
                    prevBooks.map(book => book.id === id ? { ...book, ...updatedData } : book)
                );
            })
            .catch(error => console.log(error));
    };


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            deleteBook(id)
                .then(() => {
                    console.log('Book deleted');
                    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
                })
                .catch(error => console.log(error));
        }
    };

    const openModal = (book) => {
        setCurrentBook(book);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentBook(null);
    };


    return (
        <div className="container py-5 g-4 g-lg-5">
            <SearchInput searchTerm={searchTerm} handleSearch={handleSearch}/>
            <div className="row">
            
            <BestSellers 
                books={books} 
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
            <BookForm onAddBook={handleAddBook}/>
            {addedBooks.length > 0 && <BooksYouAdded books={addedBooks} />}
        </div>
    );
};

export default Books;



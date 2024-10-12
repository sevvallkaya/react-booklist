import React, { useEffect, useState } from "react";
import { getBooks, updateBook, deleteBook } from "../services/bookService";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import BooksYouAdded from "../components/BooksYouAdded";
import BestSellers from "../components/BestSeller";
import UpdateBookModal from "../components/UpdateBookModal";
import SearchInput from "../components/SearchInput";
import BookForm from "./BookForm";
import { useBooks } from "../context/BooksContext";

const Books = () => {
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const { addedBooks, setAddedBooks }= useBooks(); 
    const [allBooks, setAllBooks] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);

    useEffect(() => {
        getBooks().then(response => {
            console.log("API response:", response.data); 
            const currentBooks = response.data;
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
            console.log(books, allBooks);
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


    // const handleUpdate = (id, updatedData) => {

    //     setAddedBooks(prevBooks =>
    //         prevBooks.map(book => book.id === id ? { ...book, ...updatedData } : book)
    //     );

    //     if (books.find(book => book.id === id)) {
    //         updateBook(id, updatedData)
    //             .then(response => {
    //                 setBooks(prevBooks =>
    //                     prevBooks.map(book => book.id === id ? { ...book, ...updatedData } : book)
    //                 );
    //                 console.log("Book updated:", response.data);
    //             })
    //             .catch(error => console.log(error));
    //     }
    // };
    
    const handleUpdate = (id, updatedData) => {
        console.log("Updating book with ID:", id);
        console.log("Updated data:", updatedData);

        setAddedBooks(prevBooks => 
            prevBooks.map(book => book.id === id ? { ...book, ...updatedData } : book)
        );
    
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

            setAddedBooks(prevBooks => prevBooks.filter(book => book.id !== id));
            
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
    

    const openModal = (book) => {
        console.log("Opening modal for book:", book);
        setCurrentBook(book);
        setShowModal(true);
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
                    onUpdate={openModal} 
                    onDelete={handleDelete} />
            </div>
                {/* <BookForm onAddBook={handleAddBook}/> */}
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



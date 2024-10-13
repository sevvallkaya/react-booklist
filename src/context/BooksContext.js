import { useState, useContext, createContext } from "react";

const BooksContext = createContext();

export const useBooks = () => {
    return useContext(BooksContext);
}

export const BooksProvider = ({children}) => {

    const [addedBooks, setAddedBooks] = useState([]);

    const addBook = (newBook) => {
        setAddedBooks((prevBooks) => [...prevBooks, newBook]);
    };

    const updateBookContext = (id, updatedData) => {
        setAddedBooks((prevBooks) => 
            prevBooks.map(book => book.id === id ? { ...book, ...updatedData } : book)
        );
    };

    const deleteBookContext = (id) => {
        setAddedBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
    };

    return (
        <BooksContext.Provider value={{addedBooks, setAddedBooks, addBook, updateBookContext, deleteBookContext}}>
            {children}
        </BooksContext.Provider>
    )
}

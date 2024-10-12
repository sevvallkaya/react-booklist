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

    return (
        <BooksContext.Provider value={{addedBooks, setAddedBooks, addBook}}>
            {children}
        </BooksContext.Provider>
    )
}

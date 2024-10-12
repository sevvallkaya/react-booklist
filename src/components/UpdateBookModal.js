import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";


const UpdateBookModal = ({ show, handleClose, book, handleUpdate }) => {
    const [updatedBook, setUpdatedBook] = useState({
        name: book.name,
        author: book.author,
        price: book.price
    });

    useEffect(() => {
        if (book) {
            setUpdatedBook({
                name: book.name,
                author: book.author,
                price: book.price
            });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook({ ...updatedBook, [name]: value });
    };

    const handleSubmit = () => {
        handleUpdate(book.id, updatedBook);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} className="">
        <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
            <div className="mb-3">
                <label className="form-label">Book Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    value={updatedBook.name} 
                    onChange={handleChange} 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Author</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="author" 
                    value={updatedBook.author} 
                    onChange={handleChange} 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Price</label>
                <input 
                    type="number" 
                    className="form-control" 
                    name="price" 
                    value={updatedBook.price} 
                    onChange={handleChange} 
                />
            </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
            <Button variant="outline-primary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Update
            </Button>
        </Modal.Footer>
    </Modal>
    );
};

export default UpdateBookModal;

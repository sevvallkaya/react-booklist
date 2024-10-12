import axios from "axios";

const BASE_URL = "https://my-json-server.typicode.com/sevvallkaya/my-json-api/books";

export const getBooks = () => axios.get(BASE_URL);
export const getBookById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createBook = (book) => axios.post(BASE_URL, book);
export const updateBook = (id, updatedBook) => axios.put(`${BASE_URL}/${id}`, updatedBook);
export const deleteBook = (id) => axios.delete(`${BASE_URL}/${id}`);

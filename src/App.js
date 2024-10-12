import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import BookForm from './pages/BookForm';
import Header from './components/Header';
import Footer from './components/Footer';
import BooksYouAdded from './components/BooksYouAdded';
import { BooksProvider } from './context/BooksContext';


function App() {
  return (
    <BooksProvider>
      <BrowserRouter>
          <Header/> 
          <Routes>
            <Route path='/' element={<Books/>}></Route> 
            <Route path='/books/:id' element={<BookDetails/>}></Route>
            <Route path='/add-book' element={<BookForm/>}></Route>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </BooksProvider>
  );
}

export default App;

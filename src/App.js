import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from'./components/Login';
import Navbar from './components/Navbar';
import ListProducts from './components/ListProducts';
import Cart from './components/Cart';
import {Home} from './components/admin/Home';
import Sales from './components/admin/Sales';

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<ListProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/products" element={<Home />} />
        <Route path="/admin/sales" element={<Sales />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
      </>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
// import './App.css';
import Login from'./components/Login';
import Navbar from './components/Navbar';
import ListProducts from './components/ListProducts';
import Cart from './components/Cart';
import {Home} from './components/admin/Home';
import Sales from './components/admin/Sales';
import { useState, useEffect } from 'react';
import Add from './components/admin/Add';
import Edit from './components/admin/Edit';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  /* hook que se llama cuando se monta el componente. Se utiliza para obtener el usuario del  local storage
  y el cart del  local storage. */
  useEffect(() => {
    getUser();
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  /**
   * setea el usuario.
   */
  const getUser = () => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }

  /**
   *  Obtiene los datos del servidor y 
   *  los guarda en el estado products.
   */
  const getProducts = () => {
    fetch("http://localhost:5000/api/products")
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        }).catch(err => console.log(err))
  };

  /**
   * Agrega un producto al carrito.
   * @param {Object} product
   */
  const addToCart = (id) => {
    const product = products.find((product) => product._id === id);
    let schema = {
      item: {product},
      quantity: 1,
      }
      if (product) {
        if (cart.find((product) => product._id === id)) { // si el producto ya esta en el carrito
          let newCart = cart.map((product) => {
            if (product._id === id) {
              product.quantity += 1;
            }
            return product;
          });
          setCart(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart));
        } else {
          setCart([...cart, schema]); // agrega el producto al carrito
          localStorage.setItem("cart", JSON.stringify([...cart, schema])); // actualiza el carrito en el local storage
        }
      }
    }

  return (
    <>
    <Navbar cart={cart} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<ListProducts getProducts={getProducts} products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/admin/products" element={<Home />} />
        <Route path="/admin/products/add" element={<Add getProducts={getProducts} />} />
        <Route path="/admin/products/edit/:id" element={<Edit getProducts={getProducts} />} />
        <Route path="/admin/sales" element={<Sales />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
      </>
  );
}

export default App;

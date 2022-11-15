import { Routes, Route } from 'react-router-dom';
// import './App.css';
import Login from'./components/Login';
import Navbar from './components/Navbar';
import ListProducts from './components/ListProducts';
import Cart from './components/Cart';
import {Home} from './components/admin/Home';
import Sales from './components/admin/Sales';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getUser();
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  const getUser = () => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }

  const getProducts = () => {
    fetch("http://localhost:3001/productos")
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        }).catch(err => console.log(err))
  };

  const addToCart = (id) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      if (cart.find((product) => product.id === id)) {
        setCart(
          cart.map((product) => {
            if (product.id === id) {
              product.quantity++;
              localStorage.setItem("cart", JSON.stringify(cart));
            }
            return product;
          })
        );
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
        localStorage.setItem(
          "cart",
          JSON.stringify([...cart, { ...product, quantity: 1 }])
        );
      }
    }
  };
  return (
    <>
    <Navbar cart={cart} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<ListProducts getProducts={getProducts} products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/admin/products" element={<Home />} />
        <Route path="/admin/sales" element={<Sales />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
      </>
  );
}

export default App;

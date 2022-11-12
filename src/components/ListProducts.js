import React, { useState, useEffect } from "react";
import Products from "./products.json";
import "../styles/products.css";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(Products["productos"]);
    console.log(products);
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setCart(items);
    }
  }, []);

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
      <div>ListProducts</div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3" key={product.id}>
              <div className="card mt-2 py-4" style={{ width: "17rem" }}>
                <img
                  className="img-fluid"
                  src={product.urlImagen}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Precio: {product.price}</p>
                  <p className="card-text">
                    Descripcion: {product.description}
                  </p>
                  <p className="card-text">Cantidad: {product.cantidad}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product.id)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListProducts;

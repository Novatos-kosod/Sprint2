import React, { useState, useEffect } from "react";
import "../styles/products.css";

const ListProducts = (props) => {
  const [cart, setCart] = useState([]);
  const { products, addToCart, getProducts } = props;

  useEffect(() => {
    getProducts();
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setCart(items);
    }
  }, []);

  return (
    <>
      <div className="container py-4">
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

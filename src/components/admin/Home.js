import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";

export const idProducto = (id) => {
  return id
 }

export const Home = () => {

    const [products, setProducts] = useState([])

    useEffect(() => { 
      getProducts()
    }, [])

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
    * Elimina un producto.
    * @param {Number} id
  */
  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Producto eliminado");
        getProducts();
      });
  };
  return (
    <>
      <div className="container py-4">
        <Link to="/admin/products/add" className="btn btn-primary mb-3">
          Agregar producto
        </Link>
        <div className="row">
          
          <div className="col-md-12">
            <h3>Products</h3>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product) => (
                    <tr key={product.id}> 
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
                      </td>
                      <td>
                      <Link to={`/admin/products/edit/${product.id}`} className="btn btn-primary mb-3" onClick={() => idProducto(product.id)}>
                         Editar 
                      </Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
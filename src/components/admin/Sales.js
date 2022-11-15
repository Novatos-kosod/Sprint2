import React, { useState, useEffect } from "react";

const ShowDetails = (props) => {
  const { products } = props;
  
  return (
    <>
      <div className="col-md-4">
        <h3>Details</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
             {product.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);

  // llamada a la api para obtener las ventas
  useEffect(() => {
    fetch("http://localhost:3001/ventas")
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
      });
  }, []);

  // console.log(sales)
  return (
    <>
      <div className="container py-4">
        <h3>Sales</h3>

        <div className="row">
          <div className="col-md-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">date</th>
                  <th scope="col">total</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <th scope="row">{sale.id}</th>
                    <td>{sale.fecha}</td>
                    <td>{sale.total}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => setProducts(sale.products)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* si products tiene datos, muestra el componente ShowDetails */}
          <ShowDetails products={products} /> 
        </div>
      </div>
    </>
  );
};

export default Sales;

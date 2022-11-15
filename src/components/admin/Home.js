import React, {useState,useEffect} from "react";

export const Home = () => {

    const [products, setProducts] = useState([])

    useEffect(() => { 
      getProducts()
    }, [])

  const getProducts = () => {
    fetch("http://localhost:3001/productos")
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        }).catch(err => console.log(err))
  };

  const saveProduct = (e) => {
    e.preventDefault();
    const product = {
      name: e.target.name.value,
      urlImagen: e.target.urlImagen.value,
      features: e.target.features.value,
      price: e.target.price.value,
      description: e.target.description.value,
      cantidad: e.target.stock.value,
    };
    fetch("http://localhost:3001/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Producto agregado");
      getProducts();
    }
    );

    
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:3001/productos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <>
      <div className="container py-4">
        <h3>Nuevo Producto</h3>
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={saveProduct}>
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
              />

              <label htmlFor="features">Features</label>
              <input
                className="form-control"
                type="text"
                name="features"
                id="features"
              />

              <label htmlFor="price">Price</label>
              <input
                className="form-control"
                type="text"
                name="price"
                id="price"
              />

              <label htmlFor="urlImagen">Image</label>
              <input
                className="form-control"
                type="text"
                name="urlImagen"
                id="urlImagen"
              />

              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                name="description"
                id="description"
              ></textarea> 
              
              <label htmlFor="stock">stock</label>
              <input
                className="form-control"
                type="text"
                name="stock"
                id="stock"
              />

              <button className="btn btn-primary mt-4" type="submit">
                Add Product
                
              </button>
            </form>
          </div>
          <div className="col-md-8">
            <h3>Products</h3>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
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
import React, {useState,useEffect} from "react";
import ListProducts from "../products.json";

export const Home = () => {

  const [products, setProducts] = useState([])

  useEffect(() => { 
      setProducts(ListProducts['productos'])
      console.log(products)
  }, [])


const saveProduct = (e) => {
  e.preventDefault();
  const product = {
    id: Math.random(),
    name: e.target.name.value,
    image: e.target.image.value,
    features: e.target.features.value,
    price: e.target.price.value,
    description: e.target.description.value,
  };
  
  setProducts([...products, product]);
  console.log(products);

  alert("Producto agregado");
};

const deleteProduct = (id) => {
  const newProducts = products.filter((product) => product.id !== id);
  setProducts(newProducts);
};
return (
  <>
    <div className="container py-4">
      <h3>Admin Home</h3>
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={saveProduct}>
            <label for="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
            />

            <label for="features">Features</label>
            <input
              className="form-control"
              type="text"
              name="features"
              id="features"
            />

            <label for="price">Price</label>
            <input
              className="form-control"
              type="text"
              name="price"
              id="price"
            />

            <label for="image">Image</label>
            <input
              className="form-control"
              type="text"
              name="image"
              id="image"
            />

            <label for="description">Description</label>
            <textarea
              className="form-control"
              name="description"
              id="description"
            ></textarea> 
            
            <label for="price">stock</label>
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
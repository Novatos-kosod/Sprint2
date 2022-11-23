import React from 'react'

const Add = (props) => {
    const { getProducts } = props;

     // regisra un producto
  const saveProduct = (e) => {
    e.preventDefault();
    const product = {
      name: e.target.name.value,
      urlImagen: e.target.urlImagen.value,
      features: e.target.features.value,
      price: e.target.price.value,
      description: e.target.description.value,
      stock: e.target.stock.value,
    };
    
    fetch("https://backend-shop2.herokuapp.com/api/product", {
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
  return (
    <>
        <div className="container py-4 ">
        <h2>Agregar producto</h2>
            <div className="row justify-content-center">
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
                type="text"
                className="form-control"
                name="description"
                id="description"
                required minlength="8" maxlength="30" size="10"
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
        </div>
        </div>
    </>
  )
}

export default Add

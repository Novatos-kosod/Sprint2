import React from 'react'

const Edit = (props) => {
    const { getProducts,idProducto } = props;
    const [product, setProduct] = React.useState({});

    React.useEffect(() => {
        fetch(`http://localhost:5000/api/products/${idProducto}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
            });
    }, [idProducto]);

    const editProduct = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/products/${idProducto}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert("Producto editado");
            });
    }

  return (
    <>
        <div className="container py-4 ">
              <h2>Editar producto</h2>
              <div className="row justify-content-center">
            <div className="col-md-4">
            <form onSubmit={editProduct}>
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                value={product.name}
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
                Edit Product
              </button>
            </form>
          </div>
        </div>
          </div>
    </>
  )
}

export default Edit
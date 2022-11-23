import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'

const Edit = (props) => {
    const [product, setProduct] = useState({})
    const { getProducts } = props;
    
    // extrae el id de la url
    const { id } = useParams();
    // busca el producto con el id extraido

    const getProduct = async () => {
        const res = await fetch(`https://backend-shop2.herokuapp.com/api/product/${id}`);
        const data = await res.json();
        setProduct(data);
    };

    // actualiza un producto
    const updateProduct = (e) => {
        e.preventDefault();
        const product = {
            name: e.target.name.value,
            urlImagen: e.target.urlImagen.value,
            features: e.target.features.value,
            price: e.target.price.value,
            description: e.target.description.value,
            stock: e.target.stock.value,
        };

        fetch(`https://backend-shop2.herokuapp.com/api/product/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert("Producto actualizado");
                getProducts();
            }
            ).catch((error) => {
                console.log(error);
            }
            );
    };

    useEffect(() => {
        getProduct();
    }, []);

  return (
    <>
        <div className="container py-4 ">
              <h2>Editar producto</h2>
              <div className="row justify-content-center">
            <div className="col-md-4">
            <form onSubmit={updateProduct}>
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                defaultValue={product.name}
              />

              <label htmlFor="features">Features</label>
              <input
                className="form-control"
                type="text"
                name="features"
                id="features"
                defaultValue={product.features}
              />

              <label htmlFor="price">Price</label>
              <input
                className="form-control"
                type="text"
                name="price"
                id="price"
                defaultValue={product.price}
              />

              <label htmlFor="urlImagen">Image</label>
              <input
                className="form-control"
                type="text"
                name="urlImagen"
                id="urlImagen"
                defaultValue={product.urlImagen}
              />

              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                defaultValue={product.description}
              ></textarea>
              
              <label htmlFor="stock">stock</label>
              <input
                className="form-control"
                type="number"
                name="stock"
                id="stock"
                defaultValue={product.stock}
              />
              <button className="btn btn-primary mt-4" type="submit">
                Edit Product
              </button>
              <Link to="/admin/products" className="btn btn-link mt-4">
                Go back
              </Link>
            </form>
          </div>
        </div>
          </div>
    </>
  )
}

export default Edit
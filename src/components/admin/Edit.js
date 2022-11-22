import React from 'react'

const Edit = (props) => {
    const { getProducts } = props;

     // Edita un producto
     const saveProduct = (id) =>  {
      id.setProduct();
    
    
    fetch("http://localhost:3001/productos/id", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Producto editado");
      getProducts();
    }
    );
  };
  funcion obtenerdatos (){
    var Name = document.getElementById("Name").value;
    var Price = document.getElementById("Price").value;
    var Image = document.getElementById("Image").value;
    var Description = document.getElementById("Description").value;
    var stock = document.getElementById("stock").value;

    document.regitro.Name.value = Name;
    document.regitro.Price.value = Price;
    document.regitro.Image.value = Image;
    document.regitro.Description.value = Description;
    document.regitro.stock.value = stock;

  };
  return (
    <>
        <div className="container py-4 ">
            <div className="row justify-content-center">
            <div className="col-md-4">
              <h2>Editar producto</h2>
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
        </div>
        </div>
    </>
  )
}

export default Edit
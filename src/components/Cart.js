import React, {useState, useEffect} from 'react'


const Cart = () => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')))
    }, [])
    
    const deleteProduct = (id) => {
        let newCart = cart.filter(product => product.id !== id)
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

  return (
    <>
      <div className="container py-4">
        <div className="row">
        <h3>Cart</h3>
          <div className="col-md-8">
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
              cart.length > 0 ? (
                cart.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="3">No products in cart</td>
                </tr>
              )
          }
              </tbody>
            </table>
          </div>

          {
              cart.length > 0 && (
                <div className="col-md-6 mt-4">
                    <button className="btn btn-success">Comprar</button>
                    
                  </div>
              )
          }
          </div>
      </div>
    </>
  )
}

export default Cart
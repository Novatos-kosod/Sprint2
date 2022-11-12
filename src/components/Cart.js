import React, {useState, useEffect} from 'react'


const Cart = () => {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')))
    }, [])
    
    const deleteProduct = (id) => {
        let newCart = cart.filter(product => product.id !== id)
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    const onChangeQuantity = (id, quantity) => {
        let newCart = cart.map(product => {
            if(product.id === id && quantity <= product.cantidad) {
                product.quantity = quantity
            }
            return product
        })
        if(quantity === 0) {
            deleteProduct(id)
        } else {  
            setCart(newCart)
            localStorage.setItem('cart', JSON.stringify(newCart))
        }
    }

    const getTotal = () => {
        let total = 0
        cart.forEach(product => {
            total += product.price * product.quantity
        })
        setTotal(total)
    }

    useEffect(() => { 
        getTotal()
    }, [cart])

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
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
          {
              cart.length > 0 ? (
                cart.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price * product.quantity}</td>
                    <td>
                    {/* change quantity buttons */}
                    <button className="btn btn-outline-info" onClick={() => onChangeQuantity(product.id, product.quantity - 1)}>-</button>
                    <span className="mx-2">{product.quantity}</span>
                    <button className="btn btn-outline-success" onClick={() => onChangeQuantity(product.id, product.quantity + 1)}>+</button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="4">No products in cart</td>
                </tr>
              )
          }
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <h3>Summary</h3>
            <hr />
            <h4>Total: ${total}</h4>
          </div>
          </div>
          {
              cart.length > 0 && (
                <div className="col-md-6 mt-4">
                    <button className="btn btn-success">Comprar</button>
                    
                  </div>
              )
          }
      </div>
    </>
  )
}

export default Cart
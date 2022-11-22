import React, {useState, useEffect} from 'react'


const Cart = (props) => {
    const {cart, setCart} = props;
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if(localStorage.getItem('cart')){
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])
    
    // borra un producto del carrito
    const deleteProduct = (id) => {
        let newCart = cart.filter(p => p.item.product._id !== id)
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    // actualiza la cantidad de productos en el carrito
    const onChangeQuantity = (id, quantity) => {
        let newCart = cart.map(p => {
            if(p.item.product._id === id && quantity <= p.item.product.stock) {
              p.quantity = quantity
            }
            return p
        })
        if(quantity === 0) {
            deleteProduct(id)
        } else {  
            setCart(newCart)
            localStorage.setItem('cart', JSON.stringify(newCart))
        }
    }
    
   /*
    * Calcula el total de la compra.
    */
    const getTotal = () => {
        let total = 0
        cart.forEach(p => {
            total += p.item.product.price * p.quantity
        })
        setTotal(total)
    }

    // registra la compra
    const buy = () => {
      let newSales = {
        products: cart,
        total: total
      }
      fetch('http://localhost:5000/api/sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSales)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        localStorage.removeItem('cart')
        setCart([])
        alert('Compra realizada con éxito')
      })
      .catch(err => console.log(err))
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
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
          {
              cart.length > 0 ? (
                cart.map((p) => (
                  <tr key={p.item.product._id}>
                    <td>{p.item.product.name}</td>
                    <td>${p.item.product.price}</td>
                    <td>
                    {/* change quantity buttons */}
                    <button className="btn btn-outline-info" onClick={() => onChangeQuantity(p.item.product._id, p.quantity - 1)}>-</button>
                    <span className="mx-2">{p.quantity}</span>
                    <button className="btn btn-outline-success" onClick={() => onChangeQuantity(p.item.product._id, p.quantity + 1)}>+</button>
                    </td>
                    <td>${p.item.product.price * p.quantity}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteProduct(p.item.product._id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="5">No products in cart</td>
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
                    <button className="btn btn-success" onClick={() => buy()}>
                        Comprar
                    </button>
                  </div>
              )
          }
      </div>
    </>
  )
}

export default Cart
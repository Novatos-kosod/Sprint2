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
        let newCart = cart.filter(product => product.id !== id)
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    // actualiza la cantidad de productos en el carrito
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
    
   /*
    * Calcula el total de la compra.
    */
    const getTotal = () => {
        let total = 0
        cart.forEach(product => {
            total += product.price * product.quantity
        })
        setTotal(total)
    }

    // actualiza el stock de los productos
    const updateStocks = () => {
      cart.forEach(product => {
        let newStock = product.cantidad - product.quantity
        fetch(`http://localhost:3001/productos/${product.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({cantidad: newStock})
      }) 
      .catch(err => console.log(err))
      })
    }

    // registra la compra
    const buy = () => {
      let newSales = {
        products: cart,
        total: total,
        fecha: new Date()
      }
        fetch('http://localhost:3001/ventas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSales)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            updateStocks()
            localStorage.removeItem('cart')
            setCart([])
            alert('Compra realizada con exito')
        }
        )
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
                cart.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                    {/* change quantity buttons */}
                    <button className="btn btn-outline-info" onClick={() => onChangeQuantity(product.id, product.quantity - 1)}>-</button>
                    <span className="mx-2">{product.quantity}</span>
                    <button className="btn btn-outline-success" onClick={() => onChangeQuantity(product.id, product.quantity + 1)}>+</button>
                    </td>
                    <td>{product.price * product.quantity}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>
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
import React, { useState, useEffect }from 'react'
import SalesJson from '../ventas.json'

const Sales = () => {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        setSales(SalesJson["ventas"])
        console.log(sales)
    }, [sales])

  return (
    <>
        <div className="container py-4">
            <h3>Sales</h3>

            <div className="row">
                <div className="col-md-8">
                <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Cantidad</th>
                  <th>Precio Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  sales.map((product) => (
                    <tr key={product.id}> 
                      <td>{product.producto}</td>
                      <td>{product.preciounitario}</td>
                      <td>{product.cantidadvendida}</td>
                      <td>{product.preciototal}</td>
                    <td></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            </div>
            </div>
        </div>
        
    </>
  )
}

export default Sales
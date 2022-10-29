import React, { useState, useEffect }from 'react'
import SalesJson from '../ventas.json'

const Sales = () => {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        setSales(SalesJson)
        console.log(sales)
    }, [])



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
                </tr>
              </thead>
              <tbody>
                {
                  sales.map((product) => (
                    <tr key={product.id}> 
                      <td>{product.producto}</td>
                      <td>{product.precio}</td>
                      <td>{product.cantidad}</td>
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
import React, { useState, useEffect }from "react";
import { Link, Navigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const logout = () => {
    localStorage.removeItem("user");
    return <Navigate to="/" />;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    setCart(items);
  }, []);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Novatos
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout" onClick={logout}>
                      Logout
                    </a>
                  </li>
                  {user.role === "admin" && (
                    <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/products">
                        products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/sales">
                        Sales
                      </Link>
                    </li>
                    </>
                  )}
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              
            </ul>
            <ul className="navbar-nav ms-auto">
            <li className="nav-item justify-content-end">
                <Link className="nav-link" to="/cart">
                  <button className="btn btn-primary position-relative">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {
                        cart.length
                        }
                      <span className="visually-hidden">quantity</span>
                    </span>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

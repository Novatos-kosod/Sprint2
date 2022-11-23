import React from "react";
import { Link, navigate, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const {cart ,user, setUser} = props;
  const navigate = useNavigate();

  /** 
   * Cierra la sesión del usuario.
  */
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Novatos
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  {user.role === "Admin" && (
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
                <></>
              )}
              
            </ul>
            <ul className="navbar-nav ms-auto">
            <li className="nav-item justify-content-end">
                <Link className="nav-link" to="/cart">
                  <button className="btn btn-light position-relative">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {
                        cart ? cart.length : 0
                        }
                      <span className="visually-hidden">quantity</span>
                    </span>
                  </button>
                </Link>
              </li>
              <li className="nav-item justify-content-end">
                {
                  user ? (
                    <Link className="nav-link" to="/login" onClick={logout}>
                      <button className="btn btn-primary position-relative">
                        Logout
                      </button>
                    </Link>
                  ) : (
                    <Link className="nav-link" to="/login">
                      <button className="btn btn-primary position-relative">
                        Login
                      </button>
                    </Link>
                  )
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

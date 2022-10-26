import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-dark min-vw-100">
        <h2 className="p-3 text-white">Tienda Los NovaProg</h2>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link text-white"
              data-bs-toggle="modal"
              data-bs-target="#modal"
            >
              <i className="bi bi-cart mx-5" id="carritoContenedor">
                0
              </i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

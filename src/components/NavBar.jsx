import { Link } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import "./NavBar.css";

import { useState } from "react";


function NavBar() {

  const [open, setOpen] = useState(false)

  const handleMenuOpen = () => {
    setOpen(!open)
  }



  return (
      <nav className={`navbar-main ${open ? "active" : "   "}`}>
          <Link to="/" className="company-name">SpoTech</Link>
        <ul className="navbar-ul">
          <li>
            <Link to="/" className="links">Inicio</Link>
          </li>
          <li>
            <Link to="/products" className="links">Productos</Link>
          </li>
          <li>
            <Link to="/contact" className="links">Contacto</Link>
          </li>
        </ul>

        <input type="text" placeholder="Buscar productos" className="input-search-term"/>

        <div className="log-container">
           <Link to="/cart" className="cart-icon"><IoCartSharp className="react-icon-cart"/></Link>
           <div className="account">
              <a href="#"><MdAccountCircle className="react-icon-account"/></a>
              <p>Jose Luis</p>
           </div>
        </div>



      </nav>
  );
}

export default NavBar;

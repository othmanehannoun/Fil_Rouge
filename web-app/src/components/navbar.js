import React from 'react'
import {Link} from 'react-router-dom';

//import './css/App.css';



function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
    <div className="container-sm">
        <img src="../../assets/img/work.png" width="5%" alt="xxx"/>
        <Link className="ml-3 navbar-brand" to="/">Karny</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="#">About</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact us</Link>
            </li>
        </ul>

        <div class="d-flex">
            <button class="themeBtn4">Télecharger L'app <i class="fa fa-arrow-circle-right"></i></button>       
        </div>

        </div>
    </div>
  </nav>
  );
}


export default Navbar;



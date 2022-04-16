import React from 'react';
import logo from "../components/assest/image/logo.png"
import { FiSearch } from "react-icons/fi"
// REACT FRONTAWESOME IMPORTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";



const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light main-nav">
      <div className='container-fluid'>

        <Link to="/" className="navbar-brand"><img className='logo' src={logo} alt="logo..." /></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <FontAwesomeIcon icon={faBars} style={{ color: "#fff" }} />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li to="/music" className="nav-item">
              <Link to="/music" className="nav-link">Music</Link>
            </li>
            <li className="nav-item">
              <Link to="/live" className="nav-link">Live</Link>
            </li>
            <li className="nav-item">
              <Link to="/testimonies" className="nav-link">Testimony</Link>
            </li>
            {/* ***********SEARCH ICON*********** */}
            <div className='search-bar'>
              <FiSearch color='#fff' size={17} />
            </div>
            <li className="nav-item">
              <Link to="/auth?register=true" className="btn btn-orange">
                Register
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/auth" className="sign-in">
                Sign In
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
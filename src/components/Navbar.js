import React, { useContext, useEffect } from 'react';
import logo from "../components/assest/image/logo.png"
import { FiSearch } from "react-icons/fi"
// REACT FRONTAWESOME IMPORTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import "./navbar.css"


const Navbar = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    // isAuth &&
    <header className="header">
      <nav className="navbar navbar-expand-xl navbar-light main-nav fixed-top">
        <div className='container-fluid'>

          <Link to="/" className="navbar-brand"><img className='logo' src={logo} alt="logo..." /></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} style={{ color: "#fff" }} />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
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
            </ul>

            <ul className="navbar-nav right">
              {!isLoggedIn ?
                <>
                  <li className="btn nav-item">
                    <Link to="/auth/register" className="nav-link">Register</Link>
                  </li>

                  <li className="btn nav-item bg-transparent sign-inn">
                    <Link to="/auth" className="nav-link">Sign In</Link>
                  </li>
                </>
                :
                <li className="btn nav-item">
                  <a onClick={() => { logout(); navigate("/")}} className="nav-link">Logout</a>
                </li>
              }
            </ul>
          </div>


        </div>
      </nav>
    </header>
  )
}

export default Navbar
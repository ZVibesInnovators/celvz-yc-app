import React, { useContext, useEffect } from 'react';
import logo from "../components/assest/image/logo.png"
import { FiSearch } from "react-icons/fi"
// REACT FRONTAWESOME IMPORTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useRoutes } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import "./navbar.css"
import { useMediaQuery } from "@mui/material";
import Enums from "../constants/enums";


const Navbar = (props) => {
  const navigate = useNavigate();
  const md = useMediaQuery('(max-width:1199px)')
  const { isLoggedIn, logout, permissions } = useContext(AuthContext);

  useEffect(() => {
    // localStorage.setItem("strictPage", "/live")
    const linkItems = document.querySelector("ul")
    linkItems.addEventListener("click", () => {
      console.log("params =>", permissions)
    })
  }, [])

  return (
    // isAuth &&
    <header className="header site-header">
      <nav className="navbar navbar-expand-xl navbar-light main-nav fixed-top">
        <div className='container-fluid'>

          <Link to="/" className="navbar-brand"><img className='logo' src={logo} alt="logo..." /></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} style={{ color: "#fff" }} />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ background: md ? "#000" : "inherit" }}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item" data-toggle={md && "collapse"} data-target="#navbarSupportedContent">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item" data-toggle={md && "collapse"} data-target="#navbarSupportedContent">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li to="/music" className="nav-item" data-toggle={md && "collapse"} data-target="#navbarSupportedContent">
                <Link to="/music" className="nav-link">Music</Link>
              </li>
              <li className="nav-item" data-toggle={md && "collapse"} data-target="#navbarSupportedContent">
                <Link to="/live" className="nav-link">Live</Link>
              </li>
              <li className="nav-item" data-toggle={md && "collapse"} data-target="#navbarSupportedContent">
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
                  <li className="btn nav-item" data-toggle={md && "collapse"} data-target="#navbarSupportedContent">
                    <Link to="/auth/register" className="nav-link">Register</Link>
                  </li>

                  <li className="btn nav-item bg-transparent sign-inn" data-toggle={md && "collapse"} data-target="#navbarSupportedContent">
                    <Link to="/auth" className="nav-link">Sign In</Link>
                  </li>
                </>
                :
                <>
                  {permissions.includes(Enums.PERMISSIONS.BACK_OFFICE_ACCESS) && <li className="btn nav-item" data-toggle={md && "collapse"} data-target="#navbarSupportedContent">
                    <a href={"/admin/"} target="_blank" className="nav-link">Back Office</a>
                  </li>}
                  <li className="btn nav-item" data-toggle={md && "collapse"} data-target="#navbarSupportedContent">
                    <a onClick={() => { logout(); navigate("/") }} className="nav-link">Logout</a>
                  </li>
                </>
              }
            </ul>
          </div>


        </div>
      </nav>
    </header>
  )
}

export default Navbar
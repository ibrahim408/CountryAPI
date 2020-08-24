import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'



const Navbar = () => {
    return (
        <div className="navbar-container">
        <h2>Where is the World?</h2>
        <FontAwesomeIcon className="darkModeIcon" icon={faMoon}  />
        <p>Dark Mode</p>
        </div>
    )
}

export default Navbar;


// fas or far
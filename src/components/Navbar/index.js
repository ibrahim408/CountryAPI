import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

const Navbar = (props) => {    
    return (
        <div className="navbar-container">
            <h2>Where is the World?</h2>
            <div className="right-navbar-container">
                <div onClick={props.onToggleTheme} className="dark-mode-button">
                    <FontAwesomeIcon className="dark-mode-icon icon-color" icon={faMoon}  />
                    <p className="dark-mode-text">Dark Mode</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar;


// fas or far
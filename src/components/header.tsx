import React from 'react';
import { Link } from 'react-router-dom'
import './header.css';

function Header(){
    return <header style={{marginBottom: 10}} className="menuBackground">
        <div className="menuBorder">
            <h1 className="menuTitle">Voting System</h1>
            <nav>
                <div className="menuContainer">
                <Link to="/"> <div className="menuButton">Home</div></Link>
                <Link to="/results"><div className="menuButton">Results</div></Link>
                <Link to="/vote"><div className="menuButton">Votes</div></Link>
                </div>
            </nav>
        </div>
    </header>;
}

export default Header;
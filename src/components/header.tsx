import React from 'react';
import { Link } from 'react-router-dom'

function Header(){
    return <header style={{marginBottom: 10}}>
        <h1>Voting System</h1>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/results">Results</Link></li>
                <li><Link to="/vote">Votes</Link></li>
            </ul>
        </nav>
    </header>;
}

export default Header;
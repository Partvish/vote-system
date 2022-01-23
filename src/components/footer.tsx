import React from 'react';
import './footer.css';

function Footer(){
    return <footer style={{marginTop: 10}} className="footerBackground">
        <div className="footerBorder">
            <div style={{marginBottom: 10}}>This application is a simple solution for a certain home assignment.</div>
            <div style={{marginBottom: 10}}>© Copyright 2022 Random Inc. All rights reserved. </div>
            <div>site by Tagscherer Norbert</div>
        </div>
    </footer>;
}

export default Footer;
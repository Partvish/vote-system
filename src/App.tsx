import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import {Outlet} from 'react-router-dom';

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}} >
      <Header />
      <div >
      <div style={{maxWidth: 1200, margin:'auto', marginBottom: 100, marginTop: 125, padding: 5}}>
        <Outlet />
        
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

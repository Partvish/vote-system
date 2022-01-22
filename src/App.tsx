import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import {Outlet} from 'react-router-dom';

function App() {
  return (
    <div >
      <Header />
      <div >
      <div style={{maxWidth: 1200, margin:'auto', }}>
        <Outlet />
        
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

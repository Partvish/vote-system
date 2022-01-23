import React, { useEffect } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import {Outlet} from 'react-router-dom';
import { FetchWithHeaders } from './methods/api-call-methods';
import { useDispatch } from 'react-redux';
/**
 * Main Ui element
 * It represents a wrapper react page, which contains the header, footer and the current page fragment.
 * The React Router Outlet is used here.
 */
const App =(props: any)=>{
  const dispatch = useDispatch();

  useEffect(()=>{
    FetchWithHeaders('results', {method: 'GET'})
    .then( async response=> {
        if(response.ok){
            const data: any = await response.json();
            if(data.candidate_results) {
              dispatch({type: "results/set", data: data.candidate_results});
            }
        }
    });

    FetchWithHeaders('candidates', {method: 'GET'})
    .then( async response=> {
        if(response.ok){
            const data: any = await response.json();
            if(data.candidates) {
              dispatch({type: "candidates/set", data: data.candidates});
            }
        }
    });

    FetchWithHeaders('regions', {method: 'GET'})
    .then( async response=> {
        if(response.ok){
            const data = await response.json();
            if(data.regions){
              dispatch({type: "regions/set", data: data.regions});
               
            }
        }
    });

    dispatch({type: "is-loading /set", data: true});
  }, []);

  

  return (
    <div style={{display: 'flex', flexDirection: 'column'}} >
      <Header />
      <div style={{maxWidth: 1200, margin:'auto', marginBottom: 100, marginTop: 125, padding: 5}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}


export default App;

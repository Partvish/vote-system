import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResultPage from './routes/results-page';
import VotingPage from './routes/voting-page';
import LandingPage from './routes/landing-page';

ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element = {<App />}>
      <Route path="" element = {<LandingPage />} />
      <Route path="results" element = {<ResultPage />} />    
      <Route path="vote" element = {<VotingPage />} />
    </Route>
  </Routes>
</BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

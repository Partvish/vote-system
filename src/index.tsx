import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResultPage from './routes/results-page';
import VotingPage from './routes/voting-page';
import LandingPage from './routes/landing-page';
import { Provider } from 'react-redux';
import store from './store/api-store';

/**
 * The application's entry point.
 * Nested in React-Router and Redux-Provider wrappers there's the App element.
 * With using nested routes the page fragments have their own url.
 */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<App />}>
        <Route path="" element = {<LandingPage />} />
        <Route path="results" element = {<ResultPage />} />    
        <Route path="vote" element = {<VotingPage />} />
      </Route>
    </Routes>
    </BrowserRouter>
</Provider>,
  document.getElementById('root')
);

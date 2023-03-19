import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { saveLocalData } from './services/localDataService';

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
if (token) {
  saveLocalData({
    token: token,
  });
  urlParams.delete('token');
  const newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
  window.history.replaceState({}, '', newUrl);
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



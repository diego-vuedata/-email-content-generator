import React from 'react';
import ReactDOM from 'react-dom/client';
import EmailGenerator from './components/emailGenerator';
import './styles/globals.css'
import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EmailGenerator />
  </React.StrictMode>
);

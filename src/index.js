import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const API_URL = 'http://www.mocky.io/v2/5c7e7f23310000970e3763a0';

ReactDOM.render(<App apiUrl={API_URL} />, document.getElementById('root'));

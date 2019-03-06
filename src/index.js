import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const API_URL = 'http://www.mocky.io/v2/5c7ecb163100005959376497';

ReactDOM.render(<App apiUrl={API_URL} />, document.getElementById('root'));

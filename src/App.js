import React from 'react';
import './App.css';
import MainView from './components/MainView';

const App =({apiUrl}) => (
  <div className="app">
    <MainView baseURL={apiUrl} />
  </div>
);
  

export default App;

import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Home from "./route/Home";

function App() {
  return (
    <div>
      <Route path="/" component={Home} />
    </div>
  );
}

export default App;

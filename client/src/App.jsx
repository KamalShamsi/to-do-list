import { useState } from 'react';
import './App.css';
import {useEffect} from 'react';

function App() {

  useEffect(() => {
    console.log('we are here');
  }, [])

  return (
    <div className="App">
      <h1>Hello, World!!!</h1>
    </div>
  )
}

export default App

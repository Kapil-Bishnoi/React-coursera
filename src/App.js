import React from 'react';
import './CSS/App.css';
import Main from './components/MainComponent.js';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component{

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App ;


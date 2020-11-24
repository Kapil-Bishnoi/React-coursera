import React from 'react';
import logo from './logo.svg';
import {Navbar,NavbarBrand} from 'reactstrap';
import './App.css';
import Menu from './components/MenuCompo.js';

class App extends React.Component{

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
             <NavbarBrand href="http://localhost:3001/index.html" target="_blank">Ristorante</NavbarBrand>
          </div>
        </Navbar>
        <Menu />
      </div>
    );
  }
}

export default App ;


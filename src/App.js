import React from 'react';
import logo from './logo.svg';
import {Navbar,NavbarBrand} from 'reactstrap';
import './App.css';

class App extends React.Component{

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
             <NavbarBrand href="https://reactjs.org" target="_blank">React</NavbarBrand>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default App ;


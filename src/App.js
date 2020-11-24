import React from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import './App.css';
import Menu from './components/MenuCompo.js';
import {DISHES} from './shared/dishes.js';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
             <NavbarBrand href="http://localhost:3001/index.html" target="_blank">Ristorante</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
      </div>
    );
  }
}

export default App ;


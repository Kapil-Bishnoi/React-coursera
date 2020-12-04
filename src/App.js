import React from 'react';
import './CSS/App.css';
import Main from './components/MainComponent.js';
import { BrowserRouter } from 'react-router-dom';
import {configureStore} from './redux/configureStore'
import {Provider} from 'react-redux';

const AppStore = configureStore();

class App extends React.Component{

  render() {
    return (
      <Provider store={AppStore}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App ;


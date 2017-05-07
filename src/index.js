import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import Pokedex from './containers/Pokedex';
import './styles/global.css';
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Pokedex />
  </Provider>,
  document.getElementById("pokedex-wrapper")
)

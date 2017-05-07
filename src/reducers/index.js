import { combineReducers } from 'redux';
import pokemons from './pokemonReducer';
import ui from './uiReducer';

const rootReducer = combineReducers({
  pokemons,
  ui
});

export default rootReducer;

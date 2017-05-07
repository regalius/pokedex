import initialState from './initialState';
import * as types from '../constants/ActionTypes';

export default function (state = initialState.pokemons, action){
  switch (action.type) {
    case types.FETCH_POKEMON_SUCCESS:
      return {...state, pokemons: action.pokemons};
    case types.ADD_POKEMON_SUCCESS:
      return {...state, pokemons:[...state.pokemons,...action.pokemons]};
    case types.SELECTED_POKEMON:
      return { ...state, selectedPokemon: {...action.pokemon, loading:true} };
    case types.GET_POKEMON_SUCCESS:
      return { ...state, selectedPokemon: {...state.selectedPokemon, ...action.pokemon, loading:false} };
    default:
      return state;
  }
}

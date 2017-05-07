import * as types from '../constants/ActionTypes';

export const selectPokemonAction = (pokemon) => ({
  type: types.SELECTED_POKEMON,
  pokemon
});

export const fetchPokemonAction = (url) => ({
  type: types.FETCH_POKEMON_REQUEST,
  url
});

export const addPokemonAction = (url) => ({
  type: types.ADD_POKEMON_REQUEST,
  url
});

export const getPokemonAction = (selectedPokemon) => ({
  type:types.GET_POKEMON_REQUEST,
  selectedPokemon
});

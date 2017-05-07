import { takeLatest } from 'redux-saga/effects';
import { fetchPokemonSaga, addPokemonSaga, getPokemonSaga } from './pokemonSaga';
import * as types from '../constants/ActionTypes';


export function* watchFetchPokemon() {
  yield takeLatest(types.FETCH_POKEMON_REQUEST, fetchPokemonSaga);
}

export function* watchAddPokemon() {
  yield takeLatest(types.ADD_POKEMON_REQUEST, addPokemonSaga);
}

export function* watchGetPokemon() {
  yield takeLatest(types.GET_POKEMON_REQUEST, getPokemonSaga);
}

import { put, call, fork } from 'redux-saga/effects';
import { PokeFetch} from '../api/api';
import { beautifyName, getPokemonDisplayImageFromName, getPokemonBaseSpriteFromURL, getIDfromURL } from '../utils/stringOperation';
import * as types from '../constants/ActionTypes';

export function* fetchPokemonSaga({ url }) {
  try {
    const response = yield call(PokeFetch, url);
    const pokemons = response.results.map(({ name , url }) => ({
        id: getIDfromURL(url),
        name,
        url,
        displayName: beautifyName(name),
        displayImage: getPokemonDisplayImageFromName(name),
        displaySprite: getPokemonBaseSpriteFromURL(url),
      }));
      const pagination={
        previousUrl:response.previous,
        count:response.count,
        nextUrl:response.next
      }
    yield [
      put({ type: types.FETCH_POKEMON_SUCCESS, pokemons }),
      put({ type: types.SELECTED_POKEMON, pokemon: pokemons[0] }),
      put({ type: types.UI_UPDATE_PAGINATION, pagination})
    ];
  } catch (error) {
    yield put({ type: 'FETCH_POKEMON_ERROR', error });
  }
}

export function* addPokemonSaga({ url }) {
  try {
    const response = yield call(PokeFetch, url);
    const pokemons = response.results.map(({ name , url }) => ({
        id: getIDfromURL(url),
        name,
        url,
        displayName: beautifyName(name),
        displayImage: getPokemonDisplayImageFromName(name),
        displaySprite: getPokemonBaseSpriteFromURL(url),
      }));
      const pagination={
        previousUrl:response.previous,
        count:response.count,
        nextUrl:response.next
      }
    yield [
      put({ type: types.ADD_POKEMON_SUCCESS, pokemons }),
      put({ type: types.UI_UPDATE_PAGINATION, pagination})
    ];
  } catch (error) {
    yield put({ type: 'ADD_POKEMON_ERROR', error });
  }
}

export function* getPokemonSaga( { selectedPokemon }) {
  try{
    const fetchedPokemon = yield call(PokeFetch,selectedPokemon.url);
    yield[
      put({ type: types.GET_POKEMON_SUCCESS, pokemon: fetchedPokemon })
    ];

    var fetchedPokemonTypes=[];
    for(let index in fetchedPokemon.types){
      let type=fetchedPokemon.types[index];
      let typeClone={...type};
      var fetchedType = yield call(PokeFetch, type.type.url);
      typeClone.type={...typeClone.type, ...fetchedType};
      fetchedPokemonTypes.push(typeClone);
    }
    yield[
      put({type: types.GET_POKEMON_TYPE_SUCCESS, types: fetchedPokemonTypes})
    ];

    var fetchedPokemonAbilities=[];
    for(let index in fetchedPokemon.abilities){
      let ability=fetchedPokemon.abilities[index];
      let abilityClone={...ability};
      var fetchedAbility = yield call(PokeFetch, ability.ability.url);
      abilityClone.ability={...abilityClone.ability, ...fetchedAbility};
      fetchedPokemonAbilities.push(abilityClone);
    }
    yield[
      put({type: types.GET_POKEMON_ABILITY_SUCCESS, abilities: fetchedPokemonAbilities})
    ];
  }catch (error){
    console.log(error);
    yield put({ type: 'GET_POKEMON_ERROR', error });
  }
}

/*export function* fetchTypeSaga({ url }) {
  try {
    const response = yield call(PokeFetch, url);
    const types = response.results.map(({ name , url }) => {

    };
    yield [
      put({ type: types.FETCH_TYPE_SUCCESS, types }),
    ];
  } catch (error) {
    yield put({ type: 'FETCH_POKEMON_ERROR', error });
  }
}
*/

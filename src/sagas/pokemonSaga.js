import { put, call} from 'redux-saga/effects';
import { PokeFetch} from '../api/api';
import { beautifyName, getPokemonDisplayImageFromName, getPokemonBaseSpriteFromURL, getIDfromURL,getURLFromPayload } from '../utils/stringOperation';
import * as types from '../constants/ActionTypes';

export function* fetchPokemonSaga({ payload }) {
  try {
    const url = getURLFromPayload(payload);
    const response = yield call(PokeFetch, url);
    switch(payload.name){
      case "pokemon_type":
      var pokemons = response.pokemon.map(({ pokemon }) => ({
          id: getIDfromURL(pokemon.url),
          name:pokemon.name,
          url: pokemon.url,
          displayName: beautifyName(pokemon.name),
          displayImage: getPokemonDisplayImageFromName(pokemon.name),
          displaySprite: getPokemonBaseSpriteFromURL(pokemon.url),
        }));
        var pagination={
          previousUrl:null,
          count:pokemons.length,
          nextUrl:null
        }
      yield [
        put({ type: types.UPDATE_PAGINATION, pagination}),
        put({ type: types.FETCH_POKEMON_SUCCESS, pokemons }),
        put({ type: types.SELECTED_POKEMON, pokemon: pokemons[0] }),
      ];
      case "all_pokemon":
      default:
        var pokemons = response[payload.valueField].map(({ name , url }) => ({
            id: getIDfromURL(url),
            name,
            url,
            displayName: beautifyName(name),
            displayImage: getPokemonDisplayImageFromName(name),
            displaySprite: getPokemonBaseSpriteFromURL(url),
          }));
          var pagination={
            previousUrl:response.previous,
            count:response.count,
            nextUrl:response.next
          }
        yield [
          put({ type: types.UPDATE_PAGINATION, pagination}),
          put({ type: types.FETCH_POKEMON_SUCCESS, pokemons }),
          put({ type: types.SELECTED_POKEMON, pokemon: pokemons[0] }),
        ];
    }
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
      put({ type: types.UPDATE_PAGINATION, pagination})
    ];
  } catch (error) {
    yield put({ type: 'ADD_POKEMON_ERROR', error });
  }
}

export function* getPokemonSaga( { selectedPokemon }) {
  try{
    const url = getURLFromPayload({query:'pokemon', id: selectedPokemon.id})
    const fetchedPokemon = yield call(PokeFetch,url);
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
    yield put({ type: 'GET_POKEMON_ERROR', error });
  }
}

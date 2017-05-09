import { put, call} from 'redux-saga/effects';
import { PokeFetch} from '../api/api';
import { beautifyName, getPokemonDisplayImageFromName, getPokemonBaseSpriteFromURL, getIDfromURL,getURLFromPayload } from '../utils/stringOperation';
import * as types from '../constants/ActionTypes';

export function* fetchPokemonSaga({ payload }) {
  try {
    const url = getURLFromPayload(payload);
    const response = yield call(PokeFetch, url);
    var pokemons;
    var pagination;
    switch(payload.name){
      case "pokemon_type":
        pokemons = response.pokemon.map(({ pokemon }) => ({
          id: getIDfromURL(pokemon.url),
          name:pokemon.name,
          url: pokemon.url,
          displayImage: getPokemonDisplayImageFromName(pokemon.name),
          displaySprite: getPokemonBaseSpriteFromURL(pokemon.url),
        }));
        pagination={
          previousUrl:null,
          count:pokemons.length,
          nextUrl:null
        }
      break;
      case "pokedex_name":
        pokemons = response.pokemon_entries.map(({ pokemon_species }) => ({
          id: getIDfromURL(pokemon_species.url),
          name:pokemon_species.name,
          url: pokemon_species.url,
          displayImage: getPokemonDisplayImageFromName(pokemon_species.name),
          displaySprite: getPokemonBaseSpriteFromURL(pokemon_species.url),
        }));
        pagination={
          previousUrl:null,
          count:pokemons.length,
          nextUrl:null
        }
        break;
      case "all_pokemon":
      default:
          pokemons = response[payload.valueField].map(({ name , url }) => ({
            id: getIDfromURL(url),
            name,
            url,
            displayImage: getPokemonDisplayImageFromName(name),
            displaySprite: getPokemonBaseSpriteFromURL(url),
          }));
          pagination={
            previousUrl:response.previous,
            count:response.count ? response.count: pokemons.length,
            nextUrl:response.next
          }
        break;
    }

    yield [
      put({ type: types.UPDATE_PAGINATION, pagination}),
      put({ type: types.FETCH_POKEMON_SUCCESS, pokemons }),
      put({ type: types.SELECTED_POKEMON, pokemon: pokemons[0] }),
    ];
  } catch (error) {
    console.log(error);
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
    const filteredPokemon={
      loading:false,
      abilities:fetchedPokemon.abilities,
      stats:fetchedPokemon.stats,
      measurements:{weight: fetchedPokemon.weight, height: fetchedPokemon.height},
      sprites:fetchedPokemon.sprites,
      types:fetchedPokemon.types,
      species:fetchedPokemon.species,
      moves:fetchedPokemon.moves.map(({ move })=>(move)),
    }
    yield[
      put({ type: types.GET_POKEMON_SUCCESS, pokemon: filteredPokemon })
    ];

    const fetchedPokemonSpecies = yield getPokemonSpecies(filteredPokemon);
    yield[
      put({ type: types.GET_POKEMON_SPECIES_SUCCESS, species: fetchedPokemonSpecies })
    ];

    if(fetchedPokemonSpecies.evolution_chain){
      const fetchedPokemonEvoChain = yield getPokemonEvolutionChain(fetchedPokemonSpecies)
      yield[
        put({type: types.GET_POKEMON_EVO_CHAIN_SUCCESS, evolution_chain:fetchedPokemonEvoChain})
      ];
    }

    const fetchedPokemonTypes= yield getPokemonTypes(filteredPokemon);
    yield[
      put({type: types.GET_POKEMON_TYPE_SUCCESS, types: fetchedPokemonTypes})
    ];

    const fetchedPokemonAbilities= yield getPokemonAbilities(filteredPokemon);
    yield[
      put({type: types.GET_POKEMON_ABILITY_SUCCESS, abilities: fetchedPokemonAbilities})
    ];
  }catch (error){
    console.log(error);
    yield put({ type: 'GET_POKEMON_ERROR', error });
  }
}

function* getPokemonAbilities(pokemon){
  var fetchedPokemonAbilities=[];
  for(let index in pokemon.abilities){
    let ability=pokemon.abilities[index];
    let abilityClone={...ability};
    var fetchedAbility = yield call(PokeFetch, ability.ability.url);
    abilityClone.ability={...abilityClone.ability, effect: fetchedAbility.effect_entries[0].effect};
    fetchedPokemonAbilities.push(abilityClone);
  }
  return fetchedPokemonAbilities;
}

function* getPokemonSpecies(pokemon){
  const fetchedPokemonSpecies = yield call(PokeFetch, pokemon.species.url);
  var flavor_text_entries = fetchedPokemonSpecies.flavor_text_entries;
  var description ="";
  if(flavor_text_entries){
    for(var i =0; i< flavor_text_entries.length;i++){
      if(flavor_text_entries[i].language.name=="en"){
        description=flavor_text_entries[i].flavor_text;
        break;
      }
    }
  }
  var filteredPokemonSpecies={description};
  fetchedPokemonSpecies.habitat ? filteredPokemonSpecies["habitat"]= fetchedPokemonSpecies.habitat.name :'';
  fetchedPokemonSpecies.color ? filteredPokemonSpecies["color"]= fetchedPokemonSpecies.color.name :'';
  fetchedPokemonSpecies.shape ? filteredPokemonSpecies["shape"] = fetchedPokemonSpecies.shape.name :'';
  fetchedPokemonSpecies.egg_groups ? filteredPokemonSpecies["egg_groups"] = fetchedPokemonSpecies.egg_groups.map(({ name })=>(name)) : '';
  fetchedPokemonSpecies.evolution_chain ? fetchedPokemonSpecies["evolution_chain"] = fetchedPokemonSpecies.evolution_chain: '';
  fetchedPokemonSpecies.gender_rate.toString() ? filteredPokemonSpecies["gender_rate"] = fetchedPokemonSpecies.gender_rate.toString() : '';
  fetchedPokemonSpecies.hatch_counter ? filteredPokemonSpecies["hatch_counter"] = fetchedPokemonSpecies.hatch_counter:'';
  fetchedPokemonSpecies.capture_rate ? filteredPokemonSpecies["capture_rate"] = fetchedPokemonSpecies.capture_rate : '';
  fetchedPokemonSpecies.growth_rate ? filteredPokemonSpecies["growth_rate"] = fetchedPokemonSpecies.growth_rate.name : '';
  fetchedPokemonSpecies.generation ? filteredPokemonSpecies["generation"] = fetchedPokemonSpecies.generation.name : '';
  fetchedPokemonSpecies.evolution_chain ? filteredPokemonSpecies["evolution_chain"] = fetchedPokemonSpecies.evolution_chain : '';
  return filteredPokemonSpecies;
}

function* getPokemonTypes(pokemon){
  var fetchedPokemonTypes=[];
  for(let index in pokemon.types){
    let type=pokemon.types[index];
    let typeClone={...type};
    var fetchedType = yield call(PokeFetch, type.type.url);
    typeClone.type={...typeClone.type, damage_relations:fetchedType.damage_relations};
    fetchedPokemonTypes.push(typeClone);
  }
  return fetchedPokemonTypes;
}

function* getPokemonEvolutionChain(pokemon){
  const chain = pokemon.evolution_chain;
  const fetchedPokemonEvoChain = yield call(PokeFetch, chain.url);
  var filteredPokemonEvoChain={};
  var evolutionTable=[];
  var currentChain=fetchedPokemonEvoChain.chain;
  var currentStage=[{...currentChain.species,
                        id:getIDfromURL(currentChain.species.url),
                        displaySprite:getPokemonBaseSpriteFromURL(currentChain.species.url),
                        displayImage:getPokemonDisplayImageFromName(currentChain.species.name)}];
  evolutionTable.push(currentStage);
  var nextChain = currentChain.evolves_to;
  while(nextChain && nextChain.length>0){
      currentChain=nextChain;
      nextChain= [];
      currentStage=[];
      for(var i=0; i<currentChain.length;i++){
          if(currentChain[i]){
            currentStage.push({...currentChain[i].species,
                                  id:getIDfromURL(currentChain[i].species.url),
                                  displaySprite:getPokemonBaseSpriteFromURL(currentChain[i].species.url),
                                  displayImage:getPokemonDisplayImageFromName(currentChain[i].species.name),
                                  evolution_details: currentChain[i].evolution_details,
                                  prevNodes: currentChain[i].prevNodes ? currentChain[i].prevNodes : 0 ,
                                });
            if(currentChain[i].evolves_to){
              var nextNodes = currentChain[i].evolves_to.map((evo)=>({
                ...evo,
                prevNodes:currentStage.length-1
              }));
              nextChain = [...nextChain,...nextNodes];
            }
          }
      }
      evolutionTable.push(currentStage);
  }
  filteredPokemonEvoChain= {...chain, evolutionTable};
  return filteredPokemonEvoChain;
}

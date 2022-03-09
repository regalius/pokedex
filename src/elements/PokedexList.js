import React from 'react';
import * as URL from '../constants/URL';
import { connect } from 'react-redux';
import { selectPokemonAction, addPokemonAction, getPokemonAction, spriteErrorAction } from '../actions/pokeActions';
import { toggleShowPopupAction } from '../actions/uiActions';
import { beautifyName } from '../utils/stringOperation';
import Waypoint from 'react-waypoint';

const PokedexList = ({ pokemons, selectedPokemon, pagination, showPopup, listMode, onHandleSelectPokemon, onHandleGetPokemon, onHandleScrollEnd, onHandleSpriteError })=>(
  <div id="pokedex-list-wrapper" className={listMode + (showPopup ? " hidden": "")}>
    <ul id="pokedex-list">
      {pokemons.map((pokemon) =>(
        <li key={pokemon.id} className={"pokedex-list-item" + (selectedPokemon.id===pokemon.id ? " active" : "")} style={{opacity:1}}>
            <div className="pokedex-list-thumbnail">
              <img src={pokemon.animatedSprite}  onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                if (currentTarget.src != pokemon.displaySprite) {
                  currentTarget.src=pokemon.displaySprite;
                } else {
                  currentTarget.src=URL.POKEMON_SPRITES_NODATA_URL;
                }
                currentTarget.className = currentTarget.className+ " " + "fallback"
              }} 
              alt=""/>
            </div>
            <div className="pokedex-list-info-wrapper">
              <p className="pokedex-list-info-number">{pokemon.id}</p>
              <p className="pokedex-list-info-name">{beautifyName(pokemon.name)}</p>
            </div>
            <a href="#" onMouseOver={onHandleSelectPokemon.bind(this, pokemon)} onClick={onHandleGetPokemon.bind(this, pokemon)}>
            </a>
        </li>
      ))}
      {
        pagination.nextUrl
          ? <div className="waypoint">
              <Waypoint onEnter={onHandleScrollEnd.bind(this, pagination)}/>
              <div className="loader" style={{width:"50px",height:"50px"}}></div>
              <p>Fetching data please wait...</p>
            </div>
          : <div className="waypoint">
              <p>End of result.</p>
            </div>

      }
    </ul>
  </div>
);

const mapStateToProps = ({ pokemons, ui }) => ({
  pokemons: pokemons.pokemons,
  selectedPokemon: pokemons.selectedPokemon,
  pagination: ui.pagination,
  showPopup: ui.showPopup,
  listMode: ui.listMode,
});

const mapDispatchToProps = (dispatch)=>{
  return{
    onHandleSelectPokemon:(selectedPokemon) =>
      {
        dispatch(selectPokemonAction(selectedPokemon));
      },
      onHandleScrollEnd(pagination){
        dispatch(addPokemonAction(pagination.nextUrl));
      },
      onHandleGetPokemon:(selectedPokemon) => {
        dispatch(toggleShowPopupAction());
        dispatch(getPokemonAction(selectedPokemon));
      },
      onHandleSpriteError:(selectedPokemon) =>{
        dispatch(spriteErrorAction(selectedPokemon));
      }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(PokedexList);

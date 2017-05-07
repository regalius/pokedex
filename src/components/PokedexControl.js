import React from 'react';
import PokedexList from '../elements/PokedexList';
import PokedexPopup from '../elements/PokedexPopup';
import PokedexControlBar from '../elements/PokedexControlBar';

const PokedexControl = ({ pokemons, selectedPokemon}) =>{
  return (
    <div id="pokedex-control">
      <PokedexControlBar />
      {pokemons ?
        <div>
          <PokedexList></PokedexList>
          <PokedexPopup />
        </div>
        : "No Results"
      }
    </div>
  );
}

export default PokedexControl;

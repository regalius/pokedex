import React from 'react';
import PokedexList from '../elements/PokedexList';
import PokedexPopup from '../elements/PokedexPopup';
import PokedexControlBar from '../elements/PokedexControlBar';

const PokedexControl = ({ pokemons, selectedPokemon, ui}) =>{
  return (
    <div id="pokedex-control">
      <PokedexControlBar />
      {pokemons ?
        <div>
          <PokedexList/>
          <PokedexPopup />
        </div>
        : "No Results"
      }
    </div>
  );
}

export default PokedexControl;

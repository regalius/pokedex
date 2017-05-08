import React, { PropTypes } from 'react';
import * as URL from '../constants/URL';
import { beautifyName } from '../utils/stringOperation';

const PokedexScreen = ({ selectedPokemon }) =>(
    <div id="pokedex-screen">
      <div id="pokedex-screen-summary">
          <div id="pokedex-summary-wrapper">
            <div id="pokedex-summary-img" style={{backgroundImage:'url('+(selectedPokemon.displayImage ? selectedPokemon.displayImage : URL.POKEMON_IMAGE_NODATA_URL)+')' }}></div>
            <img src={selectedPokemon.displayImage ? selectedPokemon.displayImage : URL.POKEMON_IMAGE_NODATA_URL } alt=""/>
            <p id="pokedex-summary-name">{selectedPokemon.name ? beautifyName(selectedPokemon.name) : "No Data"}</p>
          </div>
      </div>
    </div>
  );
PokedexScreen.propTypes = {
  selectedPokemon: PropTypes.object,
};
export default PokedexScreen;

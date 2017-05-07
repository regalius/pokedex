import React from 'react';
import { connect } from 'react-redux'
import PokedexSpriteShowcase from './PokedexSpriteShowcase';
import { toggleShowPopupAction } from '../actions/uiActions';
const PokedexPopup = ({ selectedPokemon, showPopup, loading, onHandleBackButton })=>{
  return (
    <div>
      {showPopup
        ? <div id="pokedex-popup-wrapper">
            {!loading
                ? <div id="pokedex-popup">
                    <div id="pokedex-popup-control">
                      <a href="#" id="pokedex-popup-back" onClick={onHandleBackButton.bind(this)}>BACK</a>
                    </div>
                    {selectedPokemon.sprites
                      ? <PokedexSpriteShowcase sprites={selectedPokemon.sprites} />
                      : ''
                    }

                  </div>
                : <div className="loader" style={{width:"100px",height:"100px"}}></div>
            }
          </div>
        : ''
      }
    </div>
  );
}
const mapStateToProps=({ pokemons, ui })=>({
  selectedPokemon: pokemons.selectedPokemon,
  loading: pokemons.selectedPokemon.loading,
  showPopup: ui.showPopup,
});

const mapDispatchToProps=(dispatch)=>({
  onHandleBackButton: (showPopup) =>{
    dispatch(toggleShowPopupAction(showPopup));
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(PokedexPopup)

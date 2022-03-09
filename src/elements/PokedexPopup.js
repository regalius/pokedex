import React from 'react';
import { connect } from 'react-redux'
import PokedexSpriteShowcase from './PokedexSpriteShowcase';
import PokedexStats from './PokedexStats';
import PokedexSpecies from './PokedexSpecies';
import PokedexMeasurement from './PokedexMeasurement';
import PokedexAbility from './PokedexAbility';
import PokedexMatchup from './PokedexMatchup';
import PokedexMoves from './PokedexMoves';
import { toggleShowPopupAction } from '../actions/uiActions';
import { beautifyName } from '../utils/stringOperation';

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
                    <div className="pokedex-popup-content">
                      <h2 className="pokedex-popup-header">
                        {selectedPokemon.id} {beautifyName(selectedPokemon.name)}
                        <div className="pokedex-popup-header-type-wrapper">
                          {selectedPokemon.types &&
                            (selectedPokemon.types.map(({ type })=>(
                              <span key={type.name} className={"type-label " + type.name}>{type.name}</span>
                            )))
                          }
                        </div>
                      </h2>
                      {selectedPokemon.stats  &&
                        <PokedexStats stats={selectedPokemon.stats} animatedSprite={selectedPokemon.animatedSprite} displaySprite={selectedPokemon.displaySprite}/>
                      }
                      {selectedPokemon.species && selectedPokemon.species.description
                        ? <PokedexSpecies species={selectedPokemon.species} />
                        : <div className="loader" style={{width: "50px",height: "50px"}}></div>
                      }
                      {selectedPokemon.measurements &&
                        <PokedexMeasurement measurements={selectedPokemon.measurements} displaySprite={selectedPokemon.displaySprite}/>
                      }
                      {selectedPokemon.sprites &&
                         <PokedexSpriteShowcase sprites={selectedPokemon.sprites} />
                      }
                      {selectedPokemon.abilities &&
                         <PokedexAbility abilities={selectedPokemon.abilities} />
                      }
                      {selectedPokemon.types &&
                        <PokedexMatchup types={selectedPokemon.types}/>
                      }
                      {selectedPokemon.moves &&
                        <PokedexMoves moves={selectedPokemon.moves}/>
                      }
                    </div>
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
  onHandleBackButton: () =>{
    dispatch(toggleShowPopupAction());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(PokedexPopup)

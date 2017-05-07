import React, { Component } from 'react';
import { connect } from 'react-redux';
import PokedexScreen from '../components/PokedexScreen';
import PokedexControl from '../components/PokedexControl';
import PokedexHeader from '../components/PokedexHeader';
import PokedexFooter from '../components/PokedexFooter';
import { fetchPokemonAction} from '../actions/pokeActions';
import '../styles/pokedex.css';

class Pokedex extends Component{
  componentDidMount(){
    this.props.dispatch(fetchPokemonAction(this.props.ui.searchPayload));
  }
  render(){
    const { pokemons, selectedPokemon, ui } = this.props;
    return(
      <div>
        {pokemons && selectedPokemon
          ? <div>
            <PokedexHeader/>
              <div id="pokedex">
                <PokedexScreen  selectedPokemon={selectedPokemon}/>
                <PokedexControl
                  pokemons={pokemons}
                  selectedPokemon={selectedPokemon}
                  ui={ui}
                />
              </div>
              <PokedexFooter/>
            </div>
          : <div id="pokedex">
              <div id="pokedex-loading">
                <div className="loader" style={{
                  width: "200px",
                  height: "200px"
                  }}>
                </div>
              </div>
            </div>
        }
        </div>
    );
  }
}
const mapStateToProps = ({ pokemons, ui }) => ({
  pokemons: pokemons.pokemons,
  selectedPokemon: pokemons.selectedPokemon,
  ui,
});

export default connect(
  mapStateToProps)(Pokedex);

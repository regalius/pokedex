import React from 'react';
import { beautifyName } from '../utils/stringOperation';
const PokemonMoves = ({ moves })=>(
  <div className="pokedex-moves pokedex-popup-block">
    <p className="pokedex-popup-block-header">Available Moves</p>
    <div className="pokedex-moves-container">
      {moves.map(({ name })=>(
        <div key={name} className="pokedex-moves-item">
          <span>{beautifyName(name)}</span>
        </div>
      ))}
    </div>
  </div>
)

export default PokemonMoves;

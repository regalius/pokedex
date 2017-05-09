import React from 'react';
import { beautifyName } from '../utils/stringOperation';
const PokemonMoves = ({ moves })=>(
  <div className="pokedex-moves pokedex-popup-block">
    <p className="pokedex-popup-block-header">Available Moves</p>
    {moves.map(({ name })=>(
      <span key={name}>{beautifyName(name)}</span>
    ))}
  </div>
)

export default PokemonMoves;

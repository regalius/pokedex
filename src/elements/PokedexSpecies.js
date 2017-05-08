import React from 'react';

const PokedexSpecies = ({ species })=>(
  <div className="pokedex-popup-block">
   {species.description && <div className="pokedex-pokemon-description">
      <p>{species.description}</p>
    </div>}
  </div>
);

export default PokedexSpecies;

import React from 'react';
import PokedexPercentBar from './PokedexPercentBar';

const PokedexStats = ({displaySprite, stats})=>(
  <div className="pokedex-stats pokedex-popup-block">
    <div className="pokedex-stats-sprites">
      <img src={displaySprite}/>
    </div>
    <div className="pokedex-stats-wrapper">
      {stats.map(({ stat, base_stat})=>(
        <PokedexPercentBar key={stat.name} min="0" max="300" value={base_stat} title={stat.name} />
      ))
      }
    </div>
  </div>
);

export default PokedexStats;

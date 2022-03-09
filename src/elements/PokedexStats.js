import React from 'react';
import PokedexPercentBar from './PokedexPercentBar';
import * as URL from '../constants/URL';

const PokedexStats = ({animatedSprite, displaySprite, stats, species })=>(
  <div className="pokedex-stats pokedex-popup-block">
    <div>
      <div className="pokedex-stats-sprites">
        <img src={animatedSprite} onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          if (currentTarget.src != displaySprite) {
            currentTarget.src=displaySprite;
          } else {
            currentTarget.src=URL.POKEMON_SPRITES_NODATA_URL;
          }
          currentTarget.className = currentTarget.className+ " " + "fallback"
        }} alt="No Data"/>
      </div>
      <div className="pokedex-stats-wrapper">
        {stats.map(({ stat, base_stat})=>(
          <PokedexPercentBar key={stat.name} min="0" max="300" value={base_stat} title={stat.name} />
        ))
        }
      </div>
    </div>
  </div>
);

export default PokedexStats;

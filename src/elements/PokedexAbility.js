import React from 'react';
import { beautifyName } from '../utils/stringOperation';

const PokedexAbility = ({ abilities }) =>{
  console.log(abilities);
  return (<div className="pokedex-ability pokedex-popup-block">
      <p className="pokedex-popup-block-header">Abilities</p>
      <div className="pokedex-ability-wrapper">
        {abilities.map(({slot, is_hidden, ability})=>(
          <div key={ability.name} className={"pokedex-dropdown pokedex-ability-item" + (is_hidden ? " hidden": "")}>
            <div className="pokedex-dropdown-header">
              <span className="pokedex-dropdown-title">{ beautifyName(ability.name) }</span>
              {is_hidden &&
                <span className="hidden-label">
                  Hidden
                </span>
              }
            </div>
            <div className="pokedex-dropdown-body">
            {ability.effect_entries ?
                <p>{ability.effect_entries[0].effect}</p>
              :
                <div style={{textAlign:"center"}}>
                  <div className="loader" style={{width:"30px", height:"30px"}}></div>
                </div>
            }
          </div>
          </div>
        ))}
      </div>
  </div>);
}

export default PokedexAbility;

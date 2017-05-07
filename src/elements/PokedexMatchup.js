import React from 'react';
import { beautifyName } from '../utils/stringOperation';


const MatchupItem = ({name, data}) =>{
  return(
    <div>
      {data.length>0
        && <div className={"pokedex-matchup-item " + name}>
            <span className="pokedex-matchup-item-header">{beautifyName(name)}</span>
            {data.map(({ name })=>(
              <span key={name} className={"type-label " + name}>{ name }</span>
            ))}
          </div>
    }
    </div>
);}

const PokedexMatchup = ({ types })=>{
  return (
    <div className="pokedex-matchup pokedex-popup-block">
      <p className="pokedex-popup-block-header">Match-ups</p>
      <div className="pokedex-matchup-container">
        {types.map(({ type })=>(
          <div key={type.name} className="pokedex-dropdown pokedex-matchup-type-container">
            <div className={"pokedex-dropdown-header pokedex-matchup-type-header " + type.name}>
              <span>{ beautifyName(type.name) }</span>
            </div>
            <div className="pokedex-dropdown-body">
              {type.damage_relations
                ?
                  <div>
                    {Object.keys(type.damage_relations).map((key)=>(
                      <MatchupItem key={key} name={key} data={type.damage_relations[key]}/>
                    ))}
                  </div>
                :
                  <div style={{textAlign:"center"}}>
                    <div className="loader" style={{width:"50px", height:"50px"}}></div>
                  </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>);
}

export default PokedexMatchup;

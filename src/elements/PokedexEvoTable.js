import React from 'react';
import { beautifyName } from '../utils/stringOperation';
const PokedexEvoTable = ({ evolutionTable })=>(
    <div className="pokedex-matchup pokedex-popup-block">
        <p className="pokedex-popup-block-header">Evolution Chain</p>
        <div className="pokedex-evolution-table">
          {evolutionTable.map((stage,index)=>{
              return(
                <div key={index} className="pokedex-evolution-column">
                      {stage.map(({id, name, displaySprite, displayImage, evolution_details, prevNodes})=>{
                        return(<div key={name} className={"pokedex-evolution-cell" + (evolution_details ? " has-popup":"")}>
                                  <img src={displaySprite} alt={name}/>
                                  <span className="pokedex-evolution-cell-name">{beautifyName(name)}</span>
                                  {evolution_details &&
                                    <div className="pokedex-evolution-cell-popup">
                                      <div className="pokedex-evolution-cell-popup-thumbnail" style={{backgroundImage:"url("+ displayImage +")"}}>
                                      </div>
                                        <div className="pokedex-evolution-cell-popup-content-wrapper">
                                          <p className="pokedex-evolution-cell-popup-content-title">
                                            {id}.{beautifyName(name)}
                                          </p>
                                          <p className="pokedex-evolution-cell-popup-previous">
                                            <span className="pokedex-evolution-cell-popup-previous-caption">Previous Stage</span>
                                            <span className="pokedex-evolution-cell-popup-previous-name">{evolutionTable[index-1][prevNodes].id}. {beautifyName(evolutionTable[index-1][prevNodes].name)}</span>
                                            <img className="pokedex-evolution-cell-popup-previous-sprite" src={evolutionTable[index-1][prevNodes].displaySprite} alt={evolutionTable[index-1][prevNodes].name}/>
                                          </p>
                                          {evolution_details.map((detail,index)=>(
                                            <div key={index} className="pokedex-evo-cell-popup-content-item">
                                              <p className="pokedex-evo-cell-popup-content-item-title">Evo. Condition
                                              </p>
                                                <div className="pokedex-evo-cell-popup-content-description">
                                                  <p className="pokedex-evo-cell-popup-content-item-desc">
                                                            <span className="pokedex-evo-cell-popup-content-item-caption">Trigger</span>
                                                            <span className="pokedex-evo-cell-popup-content-item-value">{beautifyName(detail["trigger"].name)}</span>
                                                          </p>
                                                {Object.keys(detail).map((key)=>{
                                                  if(detail[key]){
                                                    if(key==="trigger"){
                                                      return("");
                                                    }
                                                    if(detail[key].name){
                                                      return (<p key={key} className="pokedex-evo-cell-popup-content-item-desc">
                                                                <span className="pokedex-evo-cell-popup-content-item-caption">{ beautifyName(key) }</span>
                                                                <span className="pokedex-evo-cell-popup-content-item-value">{beautifyName(detail[key].name)}</span>
                                                              </p>);
                                                    }
                                                    switch(key){
                                                      case "gender":
                                                        return (<p key={key} className="pokedex-evo-cell-popup-content-item-desc">
                                                                  <span className="pokedex-evo-cell-popup-content-item-caption">Gender</span>
                                                                  <span className="pokedex-evo-cell-popup-content-item-value">{detail[key]== 1 ? "Female" : detail[key]==2 ? "Male" : "Genderless"}</span>
                                                                </p>);
                                                      case "turn_upside_down":
                                                        return (<p key={key} className="pokedex-evo-cell-popup-content-item-desc">
                                                                  <span className="pokedex-evo-cell-popup-content-item-value">3DS {!detail[key] && "doesn't"} needs to be turned upside-down as this Pokémon levels up.</span>
                                                                </p>);
                                                      case "needs_overworld_rain":
                                                        return (<p key={key} className="pokedex-evo-cell-popup-content-item-desc">
                                                                  <span className="pokedex-evo-cell-popup-content-item-value">it mus{!detail[key] && "n'"}t be raining in the overworld to cause evolution this Pokémon species</span>
                                                                </p>);
                                                      case "relative_physical_stats":
                                                        return (<p key={key} className="pokedex-evo-cell-popup-content-item-desc">
                                                                  <span className="pokedex-evo-cell-popup-content-item-caption">Physical Stats</span>
                                                                  <span className="pokedex-evo-cell-popup-content-item-value">Attack {detail[key]==1 ? ">" : detail[key]=0  ? "=" : "<" } Defense</span>
                                                                </p>);
                                                      default:
                                                        return  (<p key={key} className="pokedex-evo-cell-popup-content-item-desc">
                                                                  <span className="pokedex-evo-cell-popup-content-item-caption">{beautifyName(key)}</span>
                                                                  <span className="pokedex-evo-cell-popup-content-item-value">{beautifyName(detail[key])}</span>
                                                                </p>);
                                                    }
                                                  }
                                                  return ('');
                                                })}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                    </div>
                                  }
                              </div>);
                      })}
                      <span className="pokedex-evolution-column-caption">Stage {index+1}</span>
                    </div>);
          })}
        </div>
      </div>
  );

export default PokedexEvoTable;

import React from 'react';
import { beautifyName } from '../utils/stringOperation';
const PokedexPercentBar = ({ min,max,value,title })=>(
  <div className={"pokedex-percent-bar " + title}>
    <span className="percent-bar-title">{ beautifyName(title) }</span>
    <div className="percent-bar">
      <div className="percent-bar-filler" style={{width:(((Math.min(value/(parseInt(max)-parseInt(min))*100,100)).toString()+"%"))}}></div>
    </div>
    <span className="percent-bar-value">{ value }</span>
  </div>
)

export default PokedexPercentBar;

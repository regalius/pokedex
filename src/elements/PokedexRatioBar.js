import React from 'react';
import { beautifyName } from '../utils/stringOperation';
const PokedexRatioBar = ({ min, max, leftValue, rightValue, leftCaption, rightCaption, title })=>(
  <div className={"pokedex-percent-bar " + title}>
    <span className="percent-bar-title">{ beautifyName(leftCaption) }</span>
    <div className="percent-bar">
    { leftValue >= min && leftValue <= max &&
      <div className="percent-bar-filler left" style={{width:(((Math.min((parseInt(leftValue)/(parseInt(rightValue)+parseInt(leftValue))*100),100)).toString()+"%"))}}></div>
    }
    {
      rightValue >= min && rightValue <= max &&
      <div className="percent-bar-filler right" style={{width:(((Math.min((parseInt(rightValue)/(parseInt(rightValue)+parseInt(leftValue))*100),100)).toString()+"%"))}}></div>
    }
    </div>
    <span className="percent-bar-value">{ beautifyName(rightCaption) }</span>
  </div>
)
export default PokedexRatioBar;

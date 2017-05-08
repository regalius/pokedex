import React from 'react';
import * as MEASURE from '../constants/Measurements';
import trainer from '../img/trainer.png';
import { heightProcessor, weightProcessor } from '../utils/mathOperation';

const PokedexMeasurement = ({measurements, displaySprite})=>(
  <div className="pokedex-measurement pokedex-popup-block">
    <p className="pokedex-popup-block-header">Measurements</p>
    <div className="pokedex-measurement-wrapper">
      <div className="pokedex-measurement-item height">
        <span className="pokedex-measurement-title">Height</span>
        <div className="pokedex-measurement-height-container">
          <img className="pokedex-measurement-pokemon" src={displaySprite} alt=""/>
          <img className="pokedex-measurement-trainer" src={trainer} style={
            {width:(measurements.height > MEASURE.TRAINER_HEIGHT ? (((MEASURE.TRAINER_HEIGHT/measurements.height*100)*50/100).toString()+"%") : '')}
          } alt=""/>
        </div>
        <span className="pokedex-measurement-value">{heightProcessor(measurements.height)}</span>
        <span className="pokedex-measurement-note">Note: Image depiction might be inaccurate (trainer has base height of {heightProcessor(MEASURE.TRAINER_HEIGHT)})</span>
      </div>
      <div className="pokedex-measurement-item weight">
        <span className="pokedex-measurement-title">Weight</span>
        <span className="pokedex-measurement-value">{weightProcessor(measurements.weight)}</span>
      </div>
    </div>
  </div>
);
export default PokedexMeasurement;

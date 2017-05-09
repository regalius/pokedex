import React from 'react';
import * as MEASURE from '../constants/Measurements';
import { beautifyName } from '../utils/stringOperation';
import PokedexRatioBar from './PokedexRatioBar';
import PokedexEvoTable from './PokedexEvoTable';

const PokedexSpecies = ({ species })=>(
  <div className="pokedex-species pokedex-popup-block">
   {species.description && <div className="pokedex-species-description">
      <p>{species.description}</p>
    </div>}
    <div className="pokedex-species-meta-wrapper">
      {species.habitat &&
        <div className="pokedex-species-meta-item pokedex-species-habitat">
          <span className="pokedex-species-meta-item-header">Habitat</span>
          <span className={"habitat-icon " + species.habitat}></span>
          <span className="pokedex-species-meta-item-value">{beautifyName(species.habitat)}</span>
        </div>
      }
      {species.color &&
        <div className="pokedex-species-meta-item pokedex-species-color">
          <span className="pokedex-species-meta-item-header">Color</span>
          <span className={"color-icon " + species.color}></span>
          <span className="pokedex-species-meta-item-value">{beautifyName(species.color)}</span>
        </div>
      }
      {species.shape &&
        <div className="pokedex-species-meta-item pokedex-species-shape">
          <span className="pokedex-species-meta-item-header">Shape</span>
          <span className="standard-value"></span>
          <span className="pokedex-species-meta-item-value">{beautifyName(species.shape)}</span>
        </div>
      }
      {species.gender_rate &&
        <div className="pokedex-species-meta-item pokedex-species-gender_rate">
          <span className="pokedex-species-meta-item-header">Gender Rate</span>
          <PokedexRatioBar min="0" max={MEASURE.GENDER_MAX} leftValue={MEASURE.GENDER_MAX - species.gender_rate} rightValue={species.gender_rate} leftCaption="Male" rightCaption="Female" title="gender-rate"/>
          <span className="pokedex-species-meta-item-value">
          {
            species.gender_rate == -1
              ? "Genderless"
              : species.gender_rate == 0
                  ? "Male Only"
                  : species.gender_rate == MEASURE.GENDER_MAX
                      ? "Female Only"
                      : "Male " + (MEASURE.GENDER_MAX - species.gender_rate) + " : " + species.gender_rate + " Female"
          }
          </span>
        </div>
      }
      {species.capture_rate &&
        <div className="pokedex-species-meta-item pokedex-species-capture_rate">
          <span className="pokedex-species-meta-item-header">Capture Rate</span>
          <span className="standard-value">{species.capture_rate}/255</span>
          <span className="pokedex-species-meta-item-value">{
              species.capture_rate<50
                ? "Very Hard"
                : species.capture_rate < 100
                  ? "Hard"
                  :  species.capture_rate < 150
                    ? "Medium"
                    : species.capture_rate < 200
                      ? "Easy"
                      : "Very Easy"
          }</span>
        </div>
      }
    </div>
    <div className="pokedex-species-additional-meta-wrapper">
    {species.growth_rate &&
      <div className="pokedex-species-meta-list-item pokedex-species-growth_rate">
        <span className="pokedex-species-meta-list-item-header">Growth Rate</span>
        <span className="standard-value" style={{fontSize:"16px"}}>{beautifyName(species.growth_rate)}</span>
      </div>
    }
    {species.generation &&
      <div className="pokedex-species-meta-list-item pokedex-species-generation">
        <span className="pokedex-species-meta-list-item-header">Generation</span>
        <span className="pokedex-species-meta-list-item-value">{beautifyName(species.generation)}</span>
      </div>
    }
    {species.egg_groups &&
      <div className="pokedex-species-meta-list-item pokedex-species-egg_groups">
        <span className="pokedex-species-meta-list-item-header">Egg Groups</span>
        <span className="pokedex-species-meta-list-item-value">
          {species.egg_groups.map((group)=>(
            <div key={group}>{beautifyName(group)}</div>
          ))}
        </span>
      </div>
    }
    {species.hatch_counter && species.egg_groups && species.egg_groups.indexOf("no-eggs")===-1 &&
      <div className="pokedex-species-meta-list-item pokedex-species-hatch_counter">
        <span className="pokedex-species-meta-list-item-header">Hatch Counter</span>
        <span className="pokedex-species-meta-list-item-value">{(255 * (species.hatch_counter + 1))} Footsteps</span>
      </div>
    }
    </div>
    {species.evolution_chain.evolutionTable
      ? <PokedexEvoTable evolutionTable={species.evolution_chain.evolutionTable} />
      : <div className="loader" style={{width:"50px",height:"50px"}}></div>
    }
  </div>
);

export default PokedexSpecies;

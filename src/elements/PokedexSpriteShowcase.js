import React from 'react';

const PokedexSpriteShowcase = ({ sprites })=>(
  <div className="pokedex-sprite-showcase pokedex-popup-block">
    <p className="pokedex-popup-block-header">Sprites</p>
    <div>
      {sprites.front_default || sprites.back_default || sprites.front_female || sprites.back_female
        ? <div className="pokedex-sprite-list default">
            {sprites.front_default || sprites.back_default
              ? <div className={"pokedex-sprite-item-wrapper" + ((sprites.front_female || sprites.back_female) ? " male" : " unisex")}>
                  {sprites.front_default && <div className="pokedex-sprite-item"><img src={sprites.front_default} alt=""/><span>Front</span></div>}
                  {sprites.back_default && <div className="pokedex-sprite-item"><img src={sprites.back_default} alt=""/><span>Back</span></div>}
                </div>
              :''
            }
            {sprites.front_female || sprites.back_female
              ? <div className="pokedex-sprite-item-wrapper female">
                  {sprites.front_female && <div className="pokedex-sprite-item"><img src={sprites.front_female} alt=""/><span>Front</span></div>}
                  {sprites.back_female && <div className="pokedex-sprite-item"><img src={sprites.back_female} alt=""/><span>Back</span></div>}
                </div>
              :''
            }
          </div>
          :''
      }
      {sprites.front_shiny || sprites.back_shiny || sprites.front_shiny_female || sprites.back_shiny_female
        ? <div className="pokedex-sprite-list shiny">
            {sprites.front_shiny || sprites.back_shiny
              ? <div className={"pokedex-sprite-item-wrapper"+ ((sprites.front_female_shiny || sprites.back_female_shiny) ? " male" : " unisex")}>
                  {sprites.front_shiny && <div className="pokedex-sprite-item"><img src={sprites.front_shiny} alt=""/><span>Front</span></div>}
                  {sprites.back_shiny && <div className="pokedex-sprite-item"><img src={sprites.back_shiny} alt=""/><span>Back</span></div>}
                </div>
              :''
            }
            {sprites.front_female_shiny || sprites.back_female_shiny
              ? <div className="pokedex-sprite-item-wrapper female">
                  {sprites.front_shiny_female && <div className="pokedex-sprite-item"><img src={sprites.front_shiny_female} alt=""/><span>Front</span></div>}
                  {sprites.back_shiny_female && <div className="pokedex-sprite-item"><img src={sprites.back_shiny_female} alt=""/><span>Back</span></div>}
                </div>
              :''
            }
          </div>
          :''
      }
    </div>
  </div>
)

export default PokedexSpriteShowcase;
/*

"back_female": null,
"back_shiny_female": null,
"back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
"front_female": null,
"front_shiny_female": null,
"back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
"front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
"front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"

*/

import * as URL from '../constants/URL';
export const beautifyPokemonName = (name)=>(
  name.replace('-',' ').replace(/\b\w/g, l => l.toUpperCase())
);
export const getPokemonDisplayImageFromName = (name)=>{
  return URL.POKEMON_IMAGE_URL+name+'.jpg'
}
//Its ridiculous to do multiple API call for id *I should've used the GRAPHQL endpoint though
export const getIDfromURL = (pokeURL)=>(
  pokeURL.match(/([^\/]*)\/*$/)[1]
)
export const getPokemonBaseSpriteFromURL = (url)=>{
  var spriteName = getIDfromURL(url)+".png";
  var spriteUrl= URL.POKEMON_SPRITES_URL+spriteName;
  return spriteUrl;
}

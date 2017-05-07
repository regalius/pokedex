export const LIST_MODES = ["list","card"];
export const SEARCH_PAYLOAD ={
  all_pokemon: {name:'all_pokemon', query:'pokemon', valueField:'results' },
  pokemon_type : {name:'pokemon_type', query:"type", valueField:"pokemon|pokemon"},
  growth_rate : {name:'growth_rate', query:"growth-rate", valueField:"pokemon_species"},
  pokemon_habitat: {name: 'pokemon_habitat', query:"pokemon-habitat", valueField:"pokemon_species"},
  pokemon_shape: {name:'pokemon_shape', query:"pokemon-shape", valueField:"pokemon_species"},
}

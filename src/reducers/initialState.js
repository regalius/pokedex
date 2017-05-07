import { SEARCH_PAYLOAD } from '../constants/UIModes';
export default {
  pokemons: {},
  ui:{
    searchPayload:SEARCH_PAYLOAD.all_pokemon,
    payloadList:[],
    pagination: {previousUrl:"", nextUrl:"", count:0},
    showPopup:false,
    listMode:'list',
  },
};

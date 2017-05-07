import initialState from './initialState';
import * as types from '../constants/ActionTypes';

export default function (state = initialState.ui, action){
  switch (action.type) {
    case types.UPDATE_PAGINATION:
      return {...state, pagination: action.pagination};
    case types.TOGGLE_SHOW_POPUP:
      return {...state, showPopup: !state.showPopup};
    case types.LIST_MODE_CHANGE:
      return {...state, listMode: action.mode};
    case types.SEARCH_PAYLOAD_CHANGE:
      return {...state, searchPayload: action.payload};
    case types.FETCH_PAYLOAD_LIST_SUCCESS:
      return {...state, payloadList: action.payloadList};
    case types.SELECTED_PAYLOAD_LIST:
      return {...state, searchPayload: {...state.searchPayload, id : action.id}};
    default:
      return state;
  }
}

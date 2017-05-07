import initialState from './initialState';
import * as types from '../constants/ActionTypes';

export default function (state = initialState.ui, action){
  switch (action.type) {
    case types.UI_UPDATE_PAGINATION:
      return {...state, pagination: action.pagination};
    case types.UI_TOGGLE_SHOW_POPUP:
      return {...state, showPopup: action.showPopup};
    default:
      return state;
  }
}

import * as types from '../constants/ActionTypes';

export const toggleShowPopupAction = () => ({
  type: types.TOGGLE_SHOW_POPUP,
});

export const listModeChangeAction = (mode) => ({
  type: types.LIST_MODE_CHANGE,
  mode
});

export const searchPayloadChangeAction = (payload)=>({
  type: types.SEARCH_PAYLOAD_CHANGE,
  payload
})

export const getPayloadListAction = (payload)=>({
  type: types.FETCH_PAYLOAD_LIST_REQUEST,
  payload
})

export const selectPayloadListAction = (id) => ({
  type: types.SELECTED_PAYLOAD_LIST,
  id
});

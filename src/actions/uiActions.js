import * as types from '../constants/ActionTypes';

export const toggleShowPopupAction = (showPopup) => ({
  type: types.UI_TOGGLE_SHOW_POPUP,
  showPopup: !showPopup
});

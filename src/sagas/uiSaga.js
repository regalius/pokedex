import { put, call} from 'redux-saga/effects';
import { PokeFetch} from '../api/api';
import { getIDfromURL, getURLFromPayload } from '../utils/stringOperation';
import * as types from '../constants/ActionTypes';

export function* fetchSearchPayloadListSaga({ payload }) {
  try {
    if(payload.name!=="all_pokemon"){
      const url = getURLFromPayload(payload);
      const response = yield call(PokeFetch, url);
      const payloadList = response.results.map(({ url, name })=>({
        id: getIDfromURL(url),
        name,
        url,
      }));
      yield [
        put({ type: types.FETCH_PAYLOAD_LIST_SUCCESS, payloadList }),
      ];
    }else{
      yield [
        put({ type: types.FETCH_PAYLOAD_LIST_SUCCESS, payloadList:[] }),
      ];
    }
  } catch (error) {
    yield put({ type: 'FETCH_PAYLOAD_LIST_ERROR', error });
  }
}

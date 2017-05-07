import { fork } from 'redux-saga/effects';
import { watchFetchPokemon, watchAddPokemon, watchGetPokemon } from './watcher';

export default function* startWatchers() {
  yield [
          fork(watchFetchPokemon),
          fork(watchAddPokemon),        
          fork(watchGetPokemon),
        ];
}

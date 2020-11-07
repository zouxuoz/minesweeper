import { History } from 'history';
import { put } from 'redux-saga/effects';

import { setConfig } from '../actions';
import { StartGameAction } from '../types';

export const createStartGameSaga = (history: History) => {
  function* startGameSaga(action: StartGameAction) {
    try {
      yield put(setConfig(action.payload));

      history.push('/game');
    } catch (e) {}
  }

  return startGameSaga;
};

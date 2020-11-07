import { History } from 'history';
import { put } from 'redux-saga/effects';

import { setBoard, setStatus } from '../actions';
import { ResetGameAction } from '../types';
import { GameStatus } from '../constants';

export const createResetGameSaga = (history: History) => {
  function* resetGameSaga(action: ResetGameAction) {
    try {
      yield put(setBoard([]));
      yield put(setStatus(GameStatus.PLAYING));

      history.push('/');
    } catch (e) {}
  }

  return resetGameSaga;
};

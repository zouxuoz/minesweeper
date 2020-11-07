import { put } from 'redux-saga/effects';

import { setBoard, setStatus } from '../actions';
import { GameStatus } from '../constants';
import { RestartGameAction } from '../types';

export function* restartGameSaga(action: RestartGameAction) {
  try {
    yield put(setBoard([]));

    yield put(setStatus(GameStatus.PLAYING));
  } catch (e) {}
}

import { put } from 'redux-saga/effects';

import { setStatus } from '../actions';
import { EndGameAction } from '../types';

export function* endGameSaga(action: EndGameAction) {
  try {
    yield put(setStatus(action.payload));
  } catch (e) {}
}

import { History } from 'history';
import { takeLatest } from 'redux-saga/effects';

import {
  END_GAME,
  RESET_GAME,
  RESTART_GAME,
  REVEAL_CELL,
  START_GAME,
  TOGGLE_FLAG,
} from '../constants';

import { endGameSaga } from './endGame';
import { createResetGameSaga } from './resetGame';
import { restartGameSaga } from './restartGame';
import { revealCellSaga } from './revealCell';
import { createStartGameSaga } from './startGame';
import { toggleFlagSaga } from './toggleFlag';

export const createSaga = (history: History) => {
  function* saga() {
    yield takeLatest(START_GAME, createStartGameSaga(history));
    yield takeLatest(RESTART_GAME, restartGameSaga);
    yield takeLatest(RESET_GAME, createResetGameSaga(history));
    yield takeLatest(END_GAME, endGameSaga);
    yield takeLatest(REVEAL_CELL, revealCellSaga);
    yield takeLatest(TOGGLE_FLAG, toggleFlagSaga);
  }

  return saga;
};

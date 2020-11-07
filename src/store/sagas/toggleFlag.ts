import * as R from 'ramda';
import { put, select } from 'redux-saga/effects';

import { setBoard } from '../actions';
import { GameStatus } from '../constants';
import {
  getBoard,
  getBoardCell,
  getConfig,
  getNumberOfBombs,
  getNumberOFlags,
  getStatus,
} from '../selectors';
import { ToggleFlagAction } from '../types';
import { generateBoard } from '../utils';

export function* toggleFlagSaga(action: ToggleFlagAction) {
  try {
    const status = yield select(getStatus);

    if (status !== GameStatus.PLAYING) {
      return;
    }

    const { columnIndex, rowIndex } = action.payload;

    let board = yield select(getBoard);

    const config = yield select(getConfig);

    if (board.length === 0) {
      board = generateBoard(
        config,
        (plantColumnIndex, plantRowIndex) =>
          plantColumnIndex !== columnIndex && plantRowIndex !== rowIndex,
      );

      yield put(setBoard(board));
    }

    const numberOfBoms = yield select(getNumberOfBombs);
    const numberOfFlags = yield select(getNumberOFlags);

    const boardCell = yield select(getBoardCell, columnIndex, rowIndex);

    if (!boardCell || boardCell.revealed) {
      return;
    }

    if (boardCell.flagged || numberOfFlags < numberOfBoms) {
      yield put(
        setBoard(
          R.over(
            R.lensPath([action.payload.rowIndex, action.payload.columnIndex, 'flagged']),
            value => !value,
            board,
          ),
        ),
      );
    }
  } catch (e) {}
}

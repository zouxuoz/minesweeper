import { put, select } from 'redux-saga/effects';

import { endGame, setBoard } from '../actions';
import { BOMB, GameStatus } from '../constants';
import {
  getBoard,
  getBoardCell,
  getConfig,
  getNumberOfRevealedCells,
  getStatus,
} from '../selectors';
import { RevealCellAction } from '../types';
import { generateBoard, revealBoardCell, revealBombs } from '../utils';

export function* revealCellSaga(action: RevealCellAction) {
  try {
    const { columnIndex, rowIndex } = action.payload;

    let board = yield select(getBoard);

    const config = yield select(getConfig);

    if (board.length === 0) {
      board = generateBoard(
        config,
        (plantColumnIndex, plantRowIndex) =>
          plantColumnIndex !== columnIndex && plantRowIndex !== rowIndex,
      );
    }

    const status = yield select(getStatus);

    if (status !== GameStatus.PLAYING) {
      return;
    }

    const boardCell = yield select(getBoardCell, columnIndex, rowIndex);

    board = revealBoardCell(board, columnIndex, rowIndex);

    yield put(setBoard(board));

    if (boardCell.value === BOMB) {
      yield put(endGame(GameStatus.LOSE));
    } else {
      const numberOfRevealedCells = yield select(getNumberOfRevealedCells);

      if (config.columns * config.rows - numberOfRevealedCells === config.numberOfBoms) {
        yield put(endGame(GameStatus.WIN));

        yield put(setBoard(revealBombs(board)));
      }
    }
  } catch (e) {}
}

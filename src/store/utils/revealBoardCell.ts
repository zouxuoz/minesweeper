import * as R from 'ramda';

import { BOMB } from '../constants';
import { BoardCell, GameState } from '../types';
import { revealBombs } from './revealBombs';
import { advancedFloodFill } from './advancedFloodFill';

export const revealBoardCell = (
  board: GameState['board'],
  columnIndex: number,
  rowIndex: number,
): GameState['board'] => {
  let nextBoard = board;

  const boardCell: BoardCell | undefined = R.path([rowIndex, columnIndex], board);

  if (!boardCell || boardCell.revealed || boardCell.flagged) {
    return nextBoard;
  }

  if (boardCell.value === BOMB) {
    nextBoard = R.assocPath([rowIndex, columnIndex, 'revealed'], true, nextBoard);
    nextBoard = revealBombs(nextBoard);
  } else if (boardCell.value === 0) {
    nextBoard = advancedFloodFill(
      nextBoard,
      columnIndex,
      rowIndex,
      R.assoc('revealed', true),
      cell => !cell.revealed && !cell.flagged && cell.value !== BOMB,
      cell => cell.value === 0 && !cell.revealed,
    );
  } else {
    nextBoard = R.assocPath([rowIndex, columnIndex, 'revealed'], true, nextBoard);
  }

  return nextBoard;
};

import * as R from 'ramda';

import { GameState, BoardCell } from './types';

export const getStatus = (state: GameState): GameState['status'] => state.status;

export const getConfig = (state: GameState): GameState['config'] => state.config;

export const getBoard = (state: GameState): GameState['board'] => state.board;

export const getBoardCell = (
  state: GameState,
  columnIndex: number,
  rowIndex: number,
): BoardCell => {
  const board = getBoard(state);

  return R.path([rowIndex, columnIndex], board) || { value: 0, revealed: false, flagged: false };
};

export const getNumberOfBombs = (state: GameState): number => {
  const config = getConfig(state);

  return config.numberOfBoms;
};

export const getNumberOFlags = (state: GameState): number => {
  const board = getBoard(state);

  const numberOfFlags = R.flatten(board).filter(R.prop('flagged')).length;

  return numberOfFlags;
};

export const getNumberOfRevealedCells = (state: GameState): number => {
  const board = getBoard(state);

  const numberOfFlags = R.flatten(board).filter(R.prop('revealed')).length;

  return numberOfFlags;
};

export const getNumberOfRemainingBombs = (state: GameState): number => {
  const numberOfFlags = getNumberOFlags(state);
  const numberOfBoms = getNumberOfBombs(state);

  return numberOfBoms - numberOfFlags;
};

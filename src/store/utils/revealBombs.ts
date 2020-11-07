import { BOMB } from '../constants';
import { GameState } from '../types';

export const revealBombs = (board: GameState['board']): GameState['board'] => {
  return board.map(row =>
    row.map(cell => (cell.value === BOMB ? { ...cell, revealed: true } : cell)),
  );
};

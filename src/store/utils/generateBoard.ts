import { BOMB } from '../constants';
import { GameState } from '../types';

const increaseBombCount = (value: number | undefined) => {
  if (value === BOMB) {
    return BOMB;
  }

  return value === undefined ? 1 : value + 1;
};

const plantBomb = (
  config: GameState['config'],
  board: GameState['board'],
  canPlanBomb?: (columnIndex: number, rowIndex: number) => boolean,
): GameState['board'] => {
  const { columns, rows } = config;

  let planted = false;

  while (!planted) {
    const columnIndex = Math.floor(Math.random() * config.columns);
    const rowIndex = Math.floor(Math.random() * config.rows);

    const cell = board[rowIndex][columnIndex]?.value;

    if (
      cell !== BOMB &&
      (typeof canPlanBomb === 'function' ? canPlanBomb(columnIndex, rowIndex) : true)
    ) {
      board[rowIndex][columnIndex].value = BOMB;

      const paths = [
        [rowIndex - 1, columnIndex + 1],
        [rowIndex + 1, columnIndex + 1],
        [rowIndex, columnIndex + 1],
        [rowIndex + 1, columnIndex - 1],
        [rowIndex - 1, columnIndex - 1],
        [rowIndex, columnIndex - 1],
        [rowIndex + 1, columnIndex],
        [rowIndex - 1, columnIndex],
      ].filter(([r, c]) => c >= 0 && r >= 0 && c < columns && r < rows);

      paths.forEach(path => {
        board[path[0]][path[1]].value = increaseBombCount(board[path[0]][path[1]].value);
      });

      planted = true;
    }
  }

  return board;
};

export const generateBoard = (
  config: GameState['config'],
  canPlanBomb?: (columnIndex: number, rowIndex: number) => boolean,
): GameState['board'] => {
  const { columns, rows, numberOfBoms } = config;

  let board: GameState['board'] = Array(rows).fill(
    Array(columns).fill({ value: 0, revealed: false, flagged: false }),
  );

  board = JSON.parse(JSON.stringify(board));

  for (let index = 0; index < numberOfBoms; index++) {
    plantBomb(config, board, canPlanBomb);
  }

  return board;
};

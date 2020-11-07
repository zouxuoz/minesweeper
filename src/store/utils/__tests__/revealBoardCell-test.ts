import { BOMB } from '../../constants';
import { revealBoardCell } from '../revealBoardCell';

const BOARD = [
  [
    { value: 0, revealed: false, flagged: false },
    { value: 0, revealed: false, flagged: false },
    { value: 1, revealed: false, flagged: false },
    { value: BOMB, revealed: false, flagged: false },
    { value: 1, revealed: false, flagged: false },
  ],
  [
    { value: 0, revealed: false, flagged: false },
    { value: 0, revealed: false, flagged: false },
    { value: 1, revealed: false, flagged: false },
    { value: 1, revealed: false, flagged: false },
    { value: 1, revealed: false, flagged: false },
  ],
  [
    { value: 1, revealed: false, flagged: false },
    { value: 1, revealed: false, flagged: false },
    { value: 0, revealed: false, flagged: false },
    { value: 0, revealed: false, flagged: false },
    { value: 0, revealed: false, flagged: true },
  ],
  [
    { value: BOMB, revealed: false, flagged: false },
    { value: 1, revealed: false, flagged: false },
    { value: 0, revealed: false, flagged: false },
    { value: 1, revealed: false, flagged: false },
    { value: 1, revealed: false, flagged: false },
  ],
  [
    { value: 1, revealed: false, flagged: false },
    { value: 1, revealed: false, flagged: false },
    { value: 0, revealed: false, flagged: false },
    { value: 1, revealed: false, flagged: false },
    { value: BOMB, revealed: false, flagged: false },
  ],
];

it('Should reveal area by zero cell.', () => {
  expect(revealBoardCell(BOARD, 2, 2)).toMatchSnapshot();
});

it('Should reveal area by number cell.', () => {
  expect(revealBoardCell(BOARD, 2, 1)).toMatchSnapshot();
});

it('Should reveal all boms if cell contain bomb.', () => {
  expect(revealBoardCell(BOARD, 0, 3)).toMatchSnapshot();
});

it('Should return same board if cell is flagged', () => {
  expect(revealBoardCell(BOARD, 4, 2)).toEqual(BOARD);
});

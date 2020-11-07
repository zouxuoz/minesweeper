import { revealBombs } from '../revealBombs';
import { BOMB } from '../../constants';

it('Should reveal bombs.', () => {
  const board = [
    [
      { value: 1, revealed: false, flagged: false },
      { value: 3, revealed: false, flagged: false },
      { value: BOMB, revealed: false, flagged: false },
    ],
    [
      { value: 2, revealed: false, flagged: false },
      { value: BOMB, revealed: false, flagged: false },
      { value: BOMB, revealed: false, flagged: false },
    ],
    [
      { value: BOMB, revealed: false, flagged: false },
      { value: 3, revealed: false, flagged: false },
      { value: 2, revealed: false, flagged: false },
    ],
  ];

  expect(revealBombs(board)).toMatchSnapshot();
});

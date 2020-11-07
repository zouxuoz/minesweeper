import * as R from 'ramda';

import { BOMB } from '../../constants';
import { generateBoard } from '../generateBoard';

it('Should generate board by passed config.', () => {
  const config = { rows: 5, columns: 6, numberOfBoms: 10 };

  const board = generateBoard(config);

  expect(board.length).toEqual(config.rows);
  expect(board[0].length).toEqual(config.columns);

  const numberOfBoms = R.flatten(board).filter(R.propEq('value', BOMB)).length;

  expect(numberOfBoms).toEqual(config.numberOfBoms);
});

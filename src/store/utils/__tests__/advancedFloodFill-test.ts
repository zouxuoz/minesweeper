import { advancedFloodFill } from '../advancedFloodFill';

it('Should flood fill area.', () => {
  const area = [
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ];

  expect(
    advancedFloodFill(
      area,
      0,
      0,
      () => 2,
      cell => cell === 0,
      cell => cell === 0,
    ),
  ).toMatchSnapshot();
});

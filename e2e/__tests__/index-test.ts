import { Page } from 'puppeteer';

jest.setTimeout(10000);

const GAME_STATE = {
  status: 'PLAYING',
  config: { columns: 10, rows: 10, numberOfBoms: 10 },
  board: [
    [
      { value: 9, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
    ],
    [
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 2, revealed: false, flagged: false },
      { value: 9, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
    ],
    [
      { value: 0, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 2, revealed: false, flagged: false },
      { value: 9, revealed: false, flagged: false },
      { value: 3, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
    ],
    [
      { value: 1, revealed: false, flagged: false },
      { value: 2, revealed: false, flagged: false },
      { value: 9, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 3, revealed: false, flagged: false },
      { value: 9, revealed: false, flagged: false },
      { value: 3, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
    ],
    [
      { value: 9, revealed: false, flagged: false },
      { value: 2, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 2, revealed: false, flagged: false },
      { value: 9, revealed: false, flagged: false },
      { value: 2, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
    ],
    [
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
    ],
    [
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
    ],
    [
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
    ],
    [
      { value: 1, revealed: false, flagged: false },
      { value: 2, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 9, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
    ],
    [
      { value: 9, revealed: false, flagged: false },
      { value: 2, revealed: false, flagged: false },
      { value: 9, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 0, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
      { value: 1, revealed: false, flagged: false },
    ],
  ],
};

const GAME = {
  initGame: async (page: Page) => {
    await page.goto('http://host.docker.internal:3000');

    await page.evaluate(state => {
      localStorage.setItem('state', JSON.stringify(state));
    }, GAME_STATE);

    await page.goto('http://host.docker.internal:3000/game');
  },
  revealCell: async (page: Page, columnIndex: number, rowIndex: number) => {
    const index = rowIndex * 10 + columnIndex + 1;

    const path = '//*[@data-e2e-id="board.cell"][' + index + ']';

    const cell = await page.waitForXPath(path);

    await cell.click();
  },
  toggleFlag: async (page: Page, columnIndex: number, rowIndex: number) => {
    const index = rowIndex * 10 + columnIndex + 1;

    const path = '//*[@data-e2e-id="board.cell"][' + index + ']';

    const cell = await page.waitForXPath(path);

    await cell.click({ button: 'right' });
  },
  restartGame: async (page: Page, columnIndex: number, rowIndex: number) => {
    const smileBtn = await page.waitForXPath('//*[@data-e2e-id="board.smileBtn"]');

    await smileBtn.click();
  },
};

it('As a user, I can see initial game state.', async () => {
  await GAME.initGame(page);

  expect(await page.screenshot()).toMatchImageSnapshot();
});

it('As a user, I can toggle flag.', async () => {
  await GAME.initGame(page);

  await GAME.toggleFlag(page, 4, 0);

  expect(await page.screenshot()).toMatchImageSnapshot();

  await GAME.toggleFlag(page, 4, 0);

  expect(await page.screenshot()).toMatchImageSnapshot();
});

it('As a user, I can reveal number cell.', async () => {
  await GAME.initGame(page);

  await GAME.revealCell(page, 1, 0);

  expect(await page.screenshot()).toMatchImageSnapshot();
});

it('As a user, I can reveal zero cell.', async () => {
  await GAME.initGame(page);

  await GAME.revealCell(page, 2, 0);

  expect(await page.screenshot()).toMatchImageSnapshot();
});

it('As a user, I can lose game.', async () => {
  await GAME.initGame(page);

  await GAME.revealCell(page, 0, 0);

  expect(await page.screenshot()).toMatchImageSnapshot();
});

it('As a user, I can restart game after lose.', async () => {
  await GAME.initGame(page);

  await GAME.revealCell(page, 0, 0);
  await GAME.restartGame(page);

  expect(await page.screenshot()).toMatchImageSnapshot();
});

it('As a user, I can win game.', async () => {
  await GAME.initGame(page);

  await GAME.revealCell(page, 9, 0);
  await GAME.revealCell(page, 9, 8);
  await GAME.revealCell(page, 9, 9);
  await GAME.revealCell(page, 8, 9);
  await GAME.revealCell(page, 1, 9);
  await GAME.revealCell(page, 2, 0);
  await GAME.revealCell(page, 0, 1);
  await GAME.revealCell(page, 0, 2);
  await GAME.revealCell(page, 1, 4);
  await GAME.revealCell(page, 1, 3);
  await GAME.revealCell(page, 3, 3);
  await GAME.revealCell(page, 6, 0);
  await GAME.revealCell(page, 5, 1);
  await GAME.revealCell(page, 4, 2);
  await GAME.revealCell(page, 4, 3);
  await GAME.revealCell(page, 4, 4);
  await GAME.revealCell(page, 6, 2);

  await page.waitFor(5000);

  expect(await page.screenshot()).toMatchImageSnapshot();
});

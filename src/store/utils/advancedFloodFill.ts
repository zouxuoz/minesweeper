export const advancedFloodFill = <Cell>(
  board: Array<Array<Cell>>,
  columnIndex: number,
  rowIndex: number,
  callbackFn: (cell: Cell) => Cell,
  shouldFill: (cell: Cell) => boolean,
  shouldContinue: (cell: Cell) => boolean,
): Array<Array<Cell>> => {
  const columns = board.length;
  const rows = board[0].length;

  const nextBoard = JSON.parse(JSON.stringify(board));

  const queueColumn = [columnIndex];
  const queueRow = [rowIndex];

  while (queueColumn.length > 0 && queueRow.length > 0) {
    const currentColumnIndex = queueColumn.pop() as number;
    const currentRowIndex = queueRow.pop() as number;

    let eastColumnIndex = currentColumnIndex;
    let westColumnIndex = currentColumnIndex;

    while (
      eastColumnIndex < columns - 1 &&
      shouldContinue(nextBoard[currentRowIndex][eastColumnIndex]) &&
      shouldFill(nextBoard[currentRowIndex][eastColumnIndex + 1])
    ) {
      eastColumnIndex++;
    }

    while (
      westColumnIndex >= 1 &&
      shouldContinue(nextBoard[currentRowIndex][westColumnIndex]) &&
      shouldFill(nextBoard[currentRowIndex][westColumnIndex - 1])
    ) {
      westColumnIndex--;
    }

    for (let index = westColumnIndex; index <= eastColumnIndex; index++) {
      if (
        currentRowIndex + 1 < rows &&
        shouldContinue(nextBoard[currentRowIndex][index]) &&
        shouldFill(nextBoard[currentRowIndex + 1][index])
      ) {
        queueColumn.push(index);
        queueRow.push(currentRowIndex + 1);
      }

      if (
        currentRowIndex - 1 >= 0 &&
        shouldContinue(nextBoard[currentRowIndex][index]) &&
        shouldFill(nextBoard[currentRowIndex - 1][index])
      ) {
        queueColumn.push(index);
        queueRow.push(currentRowIndex - 1);
      }
      nextBoard[currentRowIndex][index] = callbackFn(nextBoard[currentRowIndex][index]);
    }
  }

  return nextBoard;
};

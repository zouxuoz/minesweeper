import React from 'react';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { AutoSizer, Grid } from 'react-virtualized';
import styled, { css } from 'styled-components';

import { getConfig } from '../store';
import { BoardCell } from './BoardCell';

const BoardTag = styled.div<{ columns: number; rows: number }>`
  ${({ columns, rows }) =>
    css`
      width: ${Math.min(20, columns) * 32}px;
      height: ${Math.min(20, rows) * 32}px;
    `}
`;

export const Board = () => {
  const config = useSelector(getConfig, R.equals);

  const cellRenderer = React.useCallback(
    ({ style, columnIndex, rowIndex, key }) => (
      <BoardCell key={key} columnIndex={columnIndex} rowIndex={rowIndex} style={style} />
    ),
    [],
  );

  return (
    <BoardTag columns={config.columns} rows={config.rows} data-e2e-id="board.root">
      {
        <AutoSizer>
          {({ width, height }) => (
            <Grid
              width={width}
              height={height}
              rowCount={config.rows}
              columnCount={config.columns}
              rowHeight={32}
              columnWidth={32}
              cellRenderer={cellRenderer}
            />
          )}
        </AutoSizer>
      }
    </BoardTag>
  );
};

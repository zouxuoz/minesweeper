import React from 'react';
import * as R from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { GameState, BOMB, getBoardCell, revealCell, toggleFlag } from '../store';

import bombSvg from '../assets/bomb.svg';
import flagSvg from '../assets/flag.svg';

interface BoardCellProps {
  columnIndex: number;
  rowIndex: number;
  style?: any;
}

const BoardCellTag = styled.div<{
  revealed: boolean;
  flagged: boolean;
  bomb: boolean;
}>`
  width: 32px;
  height: 32px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  color: rgba(0, 0, 0, 0.5);
  border: 1px solid #ddd;

  ${({ revealed, flagged, bomb }) => {
    if (revealed) {
      if (bomb) {
        return css`
          background-image: url(${bombSvg});
        `;
      }

      return css`
        background-color: #fff;
      `;
    } else if (flagged) {
      return css`
        background-image: url(${flagSvg});
      `;
    }

    return css`
      background-color: #eee;
    `;
  }}
`;

export const BoardCell: React.FC<BoardCellProps> = ({ columnIndex, rowIndex, style }) => {
  const dispatch = useDispatch();

  const cellSelector = React.useCallback(
    (state: GameState) => {
      return getBoardCell(state, columnIndex, rowIndex);
    },
    [columnIndex, rowIndex],
  );

  const cell = useSelector(cellSelector, R.equals);

  const onClick = React.useCallback(() => {
    dispatch(revealCell({ columnIndex, rowIndex }));
  }, [dispatch, columnIndex, rowIndex]);

  const onContextMenu = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();

      dispatch(toggleFlag({ columnIndex, rowIndex }));
    },
    [dispatch, columnIndex, rowIndex],
  );

  const { value, revealed, flagged } = cell;

  return (
    <BoardCellTag
      onClick={onClick}
      onContextMenu={onContextMenu}
      revealed={!!revealed}
      flagged={!!flagged}
      bomb={value === BOMB}
      style={style}
      data-e2e-id="board.cell"
    >
      {value === BOMB || !revealed ? null : value}
    </BoardCellTag>
  );
};

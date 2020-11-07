import React from 'react';
import styled from 'styled-components';

import { Board } from './Board';
import { GameToolbar } from './GameToolbar';

const GameTag = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 16px;
  display: grid;
  grid-gap: 16px;
  grid-template-rows: auto 1fr;
`;

export const Game = () => {
  return (
    <GameTag>
      <GameToolbar />
      <Board />
    </GameTag>
  );
};

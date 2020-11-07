import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Confetti from 'react-dom-confetti';

import { restartGame, resetGame, getNumberOfRemainingBombs, getStatus, GameStatus } from '../store';

import winSvg from '../assets/win.svg';
import playingSvg from '../assets/playing.svg';
import loseSvg from '../assets/lose.svg';

const SMILE_BY_STATUS = {
  [GameStatus.LOSE]: loseSvg,
  [GameStatus.WIN]: winSvg,
  [GameStatus.PLAYING]: playingSvg,
};

const GameToolbarTag = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
`;

const BombsWrapperTag = styled.div`
  display: flex;
`;

const SmileButtonWrapperTag = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const ConfigureWrapperTag = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ConfigureTag = styled.span`
  color: rgba(0, 0, 0, 0.87);
  text-decoration: underline;
  cursor: pointer;
`;

const ConfettiTag = styled.div`
  position: absolute;
  z-index: 1000;
`;

const SmileButtonTag = styled.button<{ status: GameStatus }>`
  color: #fff;
  border: 0;
  border-radius: 4px;
  outline: none;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  width: 32px;
  height: 32px;
  cursor: pointer;

  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  ${({ status }) =>
    css`
      background-image: url(${SMILE_BY_STATUS[status]});
    `}
`;

const CONFETTI_CONFIG = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 100,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

export const GameToolbar = () => {
  const dispatch = useDispatch();

  const numberOfRemainingBombs = useSelector(getNumberOfRemainingBombs);
  const status = useSelector(getStatus);

  const onRestartGame = React.useCallback(() => {
    dispatch(restartGame());
  }, [dispatch]);

  const onResetGame = React.useCallback(() => {
    dispatch(resetGame());
  }, [dispatch]);

  return (
    <GameToolbarTag>
      <BombsWrapperTag>Bombs: {numberOfRemainingBombs}</BombsWrapperTag>
      <SmileButtonWrapperTag>
        <SmileButtonTag onClick={onRestartGame} status={status} data-e2e-id="board.smileBtn" />
        <ConfettiTag>
          <Confetti active={status === GameStatus.WIN} config={CONFETTI_CONFIG} />
        </ConfettiTag>
      </SmileButtonWrapperTag>
      <ConfigureWrapperTag>
        <ConfigureTag onClick={onResetGame} data-e2e-id="board.configureAction">
          Configure
        </ConfigureTag>
      </ConfigureWrapperTag>
    </GameToolbarTag>
  );
};

import {
  END_GAME,
  RESTART_GAME,
  REVEAL_CELL,
  SET_BOARD,
  SET_CONFIG,
  SET_STATUS,
  START_GAME,
  TOGGLE_FLAG,
  RESET_GAME,
} from './constants';
import {
  EndGameAction,
  RevealCellAction,
  SetBoardAction,
  SetConfigAction,
  SetStatusAction,
  StartGameAction,
  ToggleFlagAction,
} from './types';

export const setStatus = (payload: SetStatusAction['payload']) => ({
  type: SET_STATUS,
  payload,
});

export const setConfig = (payload: SetConfigAction['payload']) => ({
  type: SET_CONFIG,
  payload,
});

export const setBoard = (payload: SetBoardAction['payload']) => ({
  type: SET_BOARD,
  payload,
});

export const startGame = (payload: StartGameAction['payload']) => ({
  type: START_GAME,
  payload,
});

export const restartGame = () => ({
  type: RESTART_GAME,
});

export const resetGame = () => ({
  type: RESET_GAME,
});

export const endGame = (payload: EndGameAction['payload']) => ({
  type: END_GAME,
  payload,
});

export const toggleFlag = (payload: ToggleFlagAction['payload']) => ({
  type: TOGGLE_FLAG,
  payload,
});

export const revealCell = (payload: RevealCellAction['payload']) => ({
  type: REVEAL_CELL,
  payload,
});

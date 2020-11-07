import {
  GameStatus,
  START_GAME,
  END_GAME,
  REVEAL_CELL,
  SET_STATUS,
  SET_CONFIG,
  TOGGLE_FLAG,
  SET_BOARD,
  RESET_GAME,
  RESTART_GAME,
} from './constants';

export type BoardCell = {
  value: number;
  revealed: boolean;
  flagged: boolean;
};

export type Board = Array<Array<BoardCell>>;

export type GameState = {
  status: GameStatus;

  config: {
    rows: number;
    columns: number;
    numberOfBoms: number;
  };

  board: Board;
};

export type SetStatusAction = {
  type: typeof SET_STATUS;
  payload: GameStatus;
};

export type StatusActions = SetStatusAction;

export type SetConfigAction = {
  type: typeof SET_CONFIG;
  payload: GameState['config'];
};

export type ConfigActions = SetConfigAction;

export type SetBoardAction = {
  type: typeof SET_BOARD;
  payload: GameState['board'];
};

export type BoardActions = SetBoardAction;

export type StartGameAction = {
  type: typeof START_GAME;
  payload: GameState['config'];
};

export type RestartGameAction = {
  type: typeof RESTART_GAME;
};

export type ResetGameAction = {
  type: typeof RESET_GAME;
};

export type EndGameAction = {
  type: typeof END_GAME;
  payload: GameStatus.WIN | GameStatus.LOSE;
};

export type ToggleFlagAction = {
  type: typeof TOGGLE_FLAG;
  payload: {
    rowIndex: number;
    columnIndex: number;
  };
};

export type RevealCellAction = {
  type: typeof REVEAL_CELL;
  payload: {
    rowIndex: number;
    columnIndex: number;
  };
};

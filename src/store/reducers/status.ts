import { Reducer } from 'react';

import { GameStatus, SET_STATUS } from '../constants';
import { GameState, StatusActions } from '../types';

export const statusReducer: Reducer<GameState['status'], StatusActions> = (
  state = GameStatus.PLAYING,
  action,
) => {
  switch (action.type) {
    case SET_STATUS: {
      return action.payload;
    }

    default:
      return state;
  }
};

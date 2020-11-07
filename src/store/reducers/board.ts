import { Reducer } from 'react';

import { SET_BOARD } from '../constants';
import { GameState, BoardActions } from '../types';

export const boardReducer: Reducer<GameState['board'], BoardActions> = (state = [], action) => {
  switch (action.type) {
    case SET_BOARD: {
      return action.payload;
    }

    default:
      return state;
  }
};

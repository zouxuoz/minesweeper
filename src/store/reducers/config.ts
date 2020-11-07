import { Reducer } from 'react';

import { SET_CONFIG } from '../constants';
import { GameState, ConfigActions } from '../types';

export const configReducer: Reducer<GameState['config'], ConfigActions> = (
  state = {
    rows: 10,
    columns: 10,
    numberOfBoms: 10,
  },
  action,
) => {
  switch (action.type) {
    case SET_CONFIG: {
      return action.payload;
    }

    default:
      return state;
  }
};

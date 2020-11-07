import { combineReducers } from 'redux';

import { statusReducer } from './status';
import { configReducer } from './config';
import { boardReducer } from './board';

export const reducer = combineReducers({
  status: statusReducer,
  config: configReducer,
  board: boardReducer,
});

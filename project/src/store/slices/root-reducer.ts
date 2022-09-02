import {combineReducers} from '@reduxjs/toolkit';

import {NameSpace} from 'enums';
import {userProcess} from './user-process/user-process';
import {dataProcess} from './data-process/data-process';
import {reviewsProcess} from './reviews-process/reviews-process';
import {offersProcess} from './offers-process/offers-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Comments]: reviewsProcess.reducer,
});

export type RootState = ReturnType<typeof rootReducer>

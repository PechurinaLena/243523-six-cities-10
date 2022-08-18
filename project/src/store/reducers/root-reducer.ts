import {combineReducers} from '@reduxjs/toolkit';

import {userReducer} from './user/user-reducer';
import {commentsReducer} from './reviews/reviews-reducer';
import {offersReducer} from './offer/offers-reducer';

export enum NameSpace {
  Comments = 'COMMENTS',
  Offers = 'OFFERS',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Comments]: commentsReducer,
  [NameSpace.Offers]: offersReducer,
  [NameSpace.User]: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>

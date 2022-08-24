import {Middleware} from 'redux';

import {rootReducer} from 'store/slices/root-reducer';
import browserHistory from 'browser-history';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'offers/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

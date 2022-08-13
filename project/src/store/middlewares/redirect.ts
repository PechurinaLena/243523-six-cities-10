import {Middleware} from 'redux';

import {reducer} from 'store/reducer';
import browserHistory from 'browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'offers/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

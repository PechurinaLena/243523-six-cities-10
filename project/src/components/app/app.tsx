import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import Login from 'pages/login';
import Main from 'pages/main';
import Room from 'pages/room';
import Favorites from 'pages/favorites';
import NotFound from 'pages/not-found';
import PrivateRoute from 'components/private-route';
import HistoryRouter from 'components/history-router';
import Loader from 'components/loader';
import {getAuthorizationStatus} from 'store/slices/user-process/selectors';
import {getDataLoaded} from 'store/slices/data-process/selectors';
import browserHistory from 'browser-history';
import {useAppSelector} from 'hooks';
import {isCheckedAuth} from 'utils';
import {AppRoute} from 'enums';

export const App: FC = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getDataLoaded);

  if (isCheckedAuth(authorizationStatus || isDataLoaded)) {
    return (
      <Loader/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path="/">
          <Route index element={<Main/>}/>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <Favorites/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<Login/>}
          />
          <Route
            path={`${AppRoute.Room}/:id`}
            element={<Room/>}
          />
          <Route
            path="*"
            element={<NotFound/>}
          />
        </Route>
      </Routes>
    </HistoryRouter>
  );
};

export default App;

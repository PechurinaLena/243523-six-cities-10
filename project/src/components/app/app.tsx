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
import {AppRoute, AuthorizationStatus, isCheckedAuth} from 'components/app/const';
import browserHistory from 'browser-history';
import {useAppSelector} from 'hooks';

export const App: FC = () => {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);
  const isAuthorizedUser = authorizationStatus === AuthorizationStatus.Auth;

  if (isCheckedAuth(authorizationStatus || isDataLoaded)) {
    return (
      <Loader/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root}
          element={<Main/>}
        />
        <Route index element={<Main/>}/>
        <Route path={`${AppRoute.Room}/:id`}
          element={<Room/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              isAuthorizedUser={isAuthorizedUser}
            >
              <Favorites/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path="*"
          element={<NotFound/>}
        />
      </Routes>
    </HistoryRouter>
  );
};

export default App;

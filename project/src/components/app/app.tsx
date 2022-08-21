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
import {AppRoute, isCheckedAuth} from 'components/app/const';
import browserHistory from 'browser-history';
import {useAppSelector} from 'hooks';

export const App: FC = () => {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state.USER);

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

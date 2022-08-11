import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import Login from 'pages/login';
import Main from 'pages/main';
import Room from 'pages/room';
import Favorites from 'pages/favorites';
import NotFound from 'pages/not-found';
import PrivateRoute from 'components/private-route';
import HistoryRouter from 'components/history-router';
import {AppRoute, AuthorizationStatus} from 'types/const';
import browserHistory from 'services/browser-history';

export const App: FC = () => (
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
            authorizationStatus={AuthorizationStatus.Auth || AuthorizationStatus.UnKnown || AuthorizationStatus.Auth}
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

export default App;

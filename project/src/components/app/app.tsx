import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from 'pages/login';
import Main from 'pages/main';
import Room from 'pages/room';
import Favorites from 'pages/favorites';
import NotFound from 'pages/not-found';
import PrivateRoute from 'components/private-route';
import {Offer} from 'types/offers';
import {AppRoute, AuthorisationStatus} from 'types/const';

type AppScreenProps = {
  offers: Offer[];
}

export const App: FC<AppScreenProps> = ({offers}) => (
  <BrowserRouter>
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
          <PrivateRoute authorisationStatus={AuthorisationStatus.Auth}>
            <Favorites offers={offers}/>
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
  </BrowserRouter>
);

export default App;

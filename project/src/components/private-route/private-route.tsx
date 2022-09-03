import {FC} from 'react';
import {Navigate} from 'react-router-dom';

import {AppRoute, AuthorizationStatus} from 'enums';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus,
  children: JSX.Element
}

export const PrivateRoute: FC<PrivateRouteProps> = ({children, authorizationStatus}) => (
  authorizationStatus === AuthorizationStatus.Auth ?
    children :
    <Navigate to={AppRoute.Login}/>
);

export default PrivateRoute;

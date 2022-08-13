import {FC} from 'react';
import {Navigate} from 'react-router-dom';

import {AppRoute} from 'components/app/const';

type PrivateRouteProps = {
  isAuthorizedUser: boolean,
  children: JSX.Element
}

export const PrivateRoute: FC<PrivateRouteProps> = ({isAuthorizedUser, children}) => (
  isAuthorizedUser ?
    children :
    <Navigate to={AppRoute.Login}/>
);

export default PrivateRoute;

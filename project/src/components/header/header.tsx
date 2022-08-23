import {BaseSyntheticEvent, FC, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {fetchFavoritesOffersAction, logoutAction} from 'store/api-actions';
import {useAppDispatch, useAppSelector} from 'hooks';
import {AppRoute, AuthorizationStatus} from 'components/app/const';
import AuthorizationButton from 'components/authorization-button';
import {getFavoriteOffers} from 'store/slices/data-process/selectors';
import {getAuthorizationStatus, getUser} from 'store/slices/user-process/selectors';

export type HeaderProps = {
  isLoginPage?: boolean;
}

export const Header: FC<HeaderProps> = ({isLoginPage}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoritesOffers = useAppSelector(getFavoriteOffers);
  const isAuthorizedUser = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (isAuthorizedUser) {
      dispatch(fetchFavoritesOffersAction());
    }
  }, [dispatch, isAuthorizedUser]);

  const handleLogin = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    navigate(AppRoute.Login);
  };

  const handleLogout = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {!isLoginPage &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuthorizedUser &&
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Favorites}
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"
                        style={{backgroundImage: `url(${user?.avatarUrl})`, borderRadius: '30px'}}
                      >
                      </div>
                      <span className="header__user-name user__name">{user?.email}</span>
                      <span className="header__favorite-count">{favoritesOffers.length}</span>
                    </Link>
                  </li>}
                <AuthorizationButton isAuthorizedUser={isAuthorizedUser} handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
};

export default Header;

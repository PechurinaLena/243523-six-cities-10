import {FC, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {fetchFavoritesOffersAction, logoutAction} from 'store/api-actions';
import {getFavoriteOffers} from 'store/slices/data-process/selectors';
import {getAuthorizationStatus, getUser} from 'store/slices/user-process/selectors';
import {useAppDispatch, useAppSelector} from 'hooks';
import {AppRoute, AuthorizationStatus} from 'enums';

export type HeaderProps = {
  isLoginPage?: boolean;
}

export const Header: FC<HeaderProps> = ({isLoginPage}) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoritesOffers = useAppSelector(getFavoriteOffers);
  const isAuthorizedUser = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (isAuthorizedUser) {
      dispatch(fetchFavoritesOffersAction());
    }
  }, [dispatch, isAuthorizedUser]);

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
              {isAuthorizedUser ?
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"
                        style={{backgroundImage: `url(${user?.avatarUrl})`, borderRadius: '30px'}}
                      >
                      </div>
                      <span className="header__user-name user__name">{(user?.email) ? user.email : ''}</span>
                      <span className="header__favorite-count">{favoritesOffers.length}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to="/"
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(logoutAction());
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>
                :
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                </ul>}
            </nav>}
        </div>
      </div>
    </header>
  );
};

export default Header;

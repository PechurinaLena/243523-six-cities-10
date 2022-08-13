import {BaseSyntheticEvent, FC} from 'react';
import {Link} from 'react-router-dom';

type AuthorizationButtonProps = {
  isAuthorizedUser: boolean;
  handleLogin: (event: BaseSyntheticEvent) => void;
  handleLogout: (event: BaseSyntheticEvent) => void
}

export const AuthorizationButton: FC<AuthorizationButtonProps> = ({isAuthorizedUser, handleLogout, handleLogin}) => (
  <li className="header__nav-item">
    <Link className="header__nav-link" to="" onClick={isAuthorizedUser ? handleLogout : handleLogin}>
      <span className={`header__${isAuthorizedUser ? 'signout' : 'login'}`}>
        {isAuthorizedUser ? 'Sign out' : 'Sign in'}
      </span>
    </Link>
  </li>
);

export default AuthorizationButton;

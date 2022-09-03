import {FC, FormEvent, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import Header from 'components/header';
import {loginAction} from 'store/api-actions';
import {setActiveCity} from 'store/slices/offers-process/offers-process';
import {getAuthorizationStatus} from 'store/slices/user-process/selectors';
import {AuthData} from 'types/auth-data';
import {City} from 'types/offers';
import {cities} from 'mocks/cities';
import {useAppDispatch, useAppSelector} from 'hooks';
import {AppRoute, AuthorizationStatus, Numbers, Titles} from 'enums';
import {getRandomCity} from 'utils';

export const Login: FC = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const randomCity = cities[getRandomCity(Numbers.Zero, Numbers.Five)];
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorizedUser = authorizationStatus === AuthorizationStatus.Auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorizedUser) {
      navigate(AppRoute.Root);
    }
  }, [isAuthorizedUser, navigate]
  );

  const handleRandomCityClick = (city: City) => {
    dispatch(setActiveCity(city));
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleLoginFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null && passwordRef.current?.value.length >= 1) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header isLoginPage/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">{Titles.LoginSignIn}</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleLoginFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  pattern="^(?=.*[a-zA-Z])(?=\w*[0-9])\w{2,20}$"
                  title="Пароль должен состоять минимум из одной буквы и цифры"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Root} className="locations__item-link"
                onClick={() => handleRandomCityClick(randomCity)}
              >
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;

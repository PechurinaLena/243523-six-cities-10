import {FC, FormEvent, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import Header from 'components/header';
import {AppRoute, getRandomCity, Titles} from 'components/app/const';
import {loginAction} from 'store/api-actions';
import {setActiveCity} from 'store/reducers/offer/action';
import {useAppDispatch} from 'hooks';
import {AuthData} from 'types/auth-data';
import {City} from 'types/offers';
import {cities} from 'mocks/cities';

export const Login: FC = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const randomCity = cities[getRandomCity(0, 5)];

  const handleClickToRandomCity = (city: City) => {
    dispatch(setActiveCity(city));
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null && passwordRef.current?.value.length >= 1) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
    navigate(AppRoute.Root);
  };

  return (
    <div className="page page--gray page--login">
      <Header isLoginPage/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">{Titles.LoginSignIn}</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
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
                onClick={() => handleClickToRandomCity(randomCity)}
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

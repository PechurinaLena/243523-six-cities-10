import {FC, Fragment} from 'react';
import {Link} from 'react-router-dom';

import {Offer} from 'types/offers';
import {AppRoute, transformRoute} from 'components/app/const';
import {cities} from 'mocks/cities';

export type FavoriteCardProps = {
  favoritesPlaces: Offer[];
}

export const FavoriteCard: FC<FavoriteCardProps> = ({favoritesPlaces}) => (
  <ul className="favorites__list">
    {cities.map((city) => {
      const favoriteCity = favoritesPlaces.filter((favorite) => favorite.city.name === city.name);
      return (
        <Fragment key={city.name}>
          {favoriteCity.map((favoriteOffer) => (
            <li key={favoriteOffer.id} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <Link to={''} className="locations__item-link">
                    <span>{favoriteOffer.city.name}</span>
                  </Link>
                </div>
              </div>
              <div className="favorites__places">
                <article className="favorites__card place-card">
                  <div className="favorites__image-wrapper place-card__image-wrapper">
                    <Link to={''}>
                      <img className="place-card__image" src={favoriteOffer.previewImage} width="150"
                        height="110"
                        alt={''}
                      />
                    </Link>
                  </div>
                  <div className="favorites__card-info place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">${favoriteOffer.price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                      <button className="place-card__bookmark-button place-card__bookmark-button--active button"
                        type="button"
                      >
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">In bookmarks</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{width: '100%'}}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <Link
                        to={(transformRoute(`${AppRoute.Room}/${favoriteOffer.id}`))}
                      >{favoriteOffer.title}
                      </Link>
                    </h2>
                    <p className="place-card__type">{favoriteOffer.type}</p>
                  </div>
                </article>
              </div>
            </li>
          ))}
        </Fragment>
      );
    })}
  </ul>
);
export default FavoriteCard;

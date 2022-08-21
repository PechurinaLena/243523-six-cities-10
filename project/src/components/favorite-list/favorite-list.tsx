import {FC} from 'react';
import {Link} from 'react-router-dom';

import FavoriteCard from 'components/favorite-card';
import {Offer} from 'types/offers';
import {cities} from 'mocks/cities';
import {useAppDispatch} from 'hooks';
import {setActiveCity} from 'store/reducers/offer/action';
import {AppRoute} from 'components/app/const';

export type FavoriteListProps = {
  favoritesOffers: Offer[]
}

export const FavoriteList: FC<FavoriteListProps> = ({favoritesOffers}) => {
  const dispatch = useAppDispatch();

  return (
    <ul className="favorites__list">
      {cities.map((city) => {
        const offersByCity = favoritesOffers.filter((offer) => offer.city.name === city.name);
        return offersByCity.length > 0 && (
          <li className="favorites__locations-items" key={city.name}
            onClick={() => {
              dispatch(setActiveCity(city));
            }}
          >
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link to={AppRoute.Root} className="locations__item-link">
                  <span>{city.name}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              <FavoriteCard offersByCity={offersByCity}/>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default FavoriteList;

import {FC} from 'react';

import Header from 'components/header';
import Footer from 'components/footer';
import FavoriteCard from 'components/favorite-card';
import FavoritesEmpty from 'components/favorites-empty';
import {Offer} from 'types/offers';
import {Titles} from 'components/app/const';
import {store} from 'store';
import {fetchFavoritesOffersAction} from 'store/api-actions';
import {useAppSelector} from 'hooks';

store.dispatch(fetchFavoritesOffersAction());

export const Favorites: FC = () => {
  const {favoritesOffers} = useAppSelector((state) => state);
  const favoritesPlaces = favoritesOffers.filter((item: Offer) => item.isFavorite);

  return (
    <div className="page">
      <Header/>
      {favoritesPlaces ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">{Titles.FavoriteTitle}</h1>
              {favoritesPlaces &&
                <FavoriteCard favoritesPlaces={favoritesPlaces}/>}
            </section>
          </div>
        </main>
        :
        <FavoritesEmpty/>}
      <Footer/>
    </div>
  );
};

export default Favorites;

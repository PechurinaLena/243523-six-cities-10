import {FC} from 'react';

import Header from 'components/header';
import Footer from 'components/footer';
import FavoriteList from 'components/favorite-list';
import FavoritesEmpty from 'components/favorites-empty';
import {Titles} from 'components/app/const';
import {useAppSelector} from 'hooks';
import {getFavoriteOffers} from '../../store/slices/data-process/selectors';

export const Favorites: FC = () => {
  const favoritesOffers = useAppSelector(getFavoriteOffers);

  return (
    <div className="page">
      <Header/>
      {favoritesOffers.length !== 0 ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">{Titles.FavoriteTitle}</h1>
              <FavoriteList favoritesOffers={favoritesOffers}/>
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

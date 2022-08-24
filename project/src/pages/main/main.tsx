import {FC} from 'react';

import Header from 'components/header';
import CardList from 'components/card-list';
import CitiesMap from 'components/cities-map';
import CityList from 'components/city-list';
import MainEmpty from 'components/main-empty';
import SortForm from 'components/sort-form';
import Loader from 'components/loader';
import {getActiveCity, getSelectedPoint} from 'store/slices/offers-process/selectors';
import {getDataLoaded, getOffers} from 'store/slices/data-process/selectors';
import {Titles} from 'components/app/const';
import {useAppSelector} from 'hooks';

const Main: FC = () => {
  const offers = useAppSelector(getOffers);
  const currentCity = useAppSelector(getActiveCity);
  const selectedCard = useAppSelector(getSelectedPoint);
  const isDataLoaded = useAppSelector(getDataLoaded);
  const cityOffers = offers.filter((offer) => offer.city.name === currentCity.name);

  return !isDataLoaded && cityOffers ?
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">{Titles.MainCities}</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList currentCity={currentCity}/>
          </section>
        </div>
        {cityOffers.length > 0 ?
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">{Titles.MainPlaces}</h2>
                <b className="places__found">{cityOffers.length} places to stay in {currentCity.name}</b>
                <SortForm/>
                <div className="cities__places-list places__list tabs__content">
                  <CardList cityOffers={cityOffers}/>
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <CitiesMap cityOffers={cityOffers} selectedCard={selectedCard} currentCity={currentCity}/>
                </section>
              </div>
            </div>
          </div>
          :
          <MainEmpty currentCity={currentCity}/>}
      </main>
    </div>
    :
    <Loader/>;
};

export default Main;

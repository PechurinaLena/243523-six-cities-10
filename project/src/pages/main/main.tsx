import {FC} from 'react';

import Header from 'components/header';
import CardList from 'components/card-list';
import CitiesMap from 'components/cities-map';
import CityList from 'components/city-list';
import MainEmpty from 'components/main-empty';
import SortOptions from 'components/sort-options';
import {useAppDispatch, useAppSelector} from 'hooks';
import {setActiveCity, setOptionsShown, setSelectedPoint, setSortingOffers} from 'store/action';
import {City} from 'types/offers';
import {Titles} from 'types/const';

const Main: FC = () => {
  const dispatch = useAppDispatch();
  const {
    selectedCard,
    currentCity,
    offers,
    sortOffers,
    isSortOptionsShown
  } = useAppSelector((state) => state);
  const onListItemHover = (listItemId: number) => dispatch(setSelectedPoint(listItemId));
  const foundCards = offers.filter((offer) => offer.city.name === currentCity.name);

  const handleClickCity = (item: City) => {
    dispatch(setActiveCity(item));
  };

  const handleChangeVisibleOptions = (value: boolean) => {
    dispatch(setOptionsShown(value));
  };

  const handleChangeOption = (option: string) => {
    dispatch(setSortingOffers(option));
  };

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">{Titles.MainCities}</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList currentCity={currentCity} handleClickCity={handleClickCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {foundCards && foundCards.length > 0 ?
              <section className="cities__places places">
                <h2 className="visually-hidden">{Titles.MainPlaces}</h2>
                <b className="places__found">{foundCards.length} places to stay in {currentCity.name}</b>
                <SortOptions sortOffers={sortOffers} isSortOptionsShown={isSortOptionsShown}
                  handleChangeVisibleOptions={handleChangeVisibleOptions}
                  handleChangeOption={handleChangeOption}
                />
                <div className="cities__places-list places__list tabs__content">
                  <CardList foundCards={foundCards} onListItemHover={onListItemHover}/>
                </div>
              </section>
              :
              <MainEmpty currentCity={currentCity}/>}
            <div className="cities__right-section">
              <section className="cities__map map">
                <CitiesMap foundCards={foundCards} selectedCard={selectedCard} currentCity={currentCity}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;

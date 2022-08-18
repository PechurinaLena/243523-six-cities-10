import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import Header from 'components/header';
import CardList from 'components/card-list';
import CitiesMap from 'components/cities-map';
import CityList from 'components/city-list';
import MainEmpty from 'components/main-empty';
import SortOptions from 'components/sort-options';
import Loader from 'components/loader';
import {AppRoute, Titles} from 'components/app/const';
import {City} from 'types/offers';
import {useAppDispatch, useAppSelector} from 'hooks';
import {fetchNearbyOffersAction, fetchOfferStatusAction} from 'store/api-actions';
import {setActiveCity, setOptionsShown, setSelectedPoint, setSortingOffers} from 'store/reducers/offer/action';

export type MainProps = {
  isAuthorizedUser: boolean;
}

const Main: FC<MainProps> = ({isAuthorizedUser}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    selectedCard,
    currentCity,
    offers,
    sortOffers,
    isSortOptionsShown,
  } = useAppSelector((state) => state.OFFERS);
  const {isDataLoaded} = useAppSelector((state) => state.USER);
  const cityOffers = offers.filter((offer) => offer.city.name === currentCity.name);
  const hotelId = offers.find((offer) => offer.id === selectedCard);

  const onListItemHover = (listItemId: number) => dispatch(setSelectedPoint(listItemId));

  const handleClickCity = (item: City) => {
    dispatch(setActiveCity(item));
  };

  const handleChangeVisibleOptions = (value: boolean) => {
    dispatch(setOptionsShown(value));
  };

  const handleChangeOption = (option: string) => {
    dispatch(setSortingOffers(option));
  };

  const handleClickToBookMark = () => {
    if (!isAuthorizedUser) {
      navigate(AppRoute.Login);
    }
    dispatch(fetchOfferStatusAction({
      hotelId: selectedCard,
      status: hotelId?.isFavorite ? 0 : 1
    }));

    if (!isDataLoaded) {
      fetchNearbyOffersAction({hotelId: hotelId ? hotelId.id : 0});
    }
  };

  return !isDataLoaded ?
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
            {cityOffers && cityOffers.length > 0 ?
              <section className="cities__places places">
                <h2 className="visually-hidden">{Titles.MainPlaces}</h2>
                <b className="places__found">{cityOffers.length} places to stay in {currentCity.name}</b>
                <SortOptions sortOffers={sortOffers} isSortOptionsShown={isSortOptionsShown}
                  handleChangeVisibleOptions={handleChangeVisibleOptions}
                  handleChangeOption={handleChangeOption}
                />
                <div className="cities__places-list places__list tabs__content">
                  <CardList cityOffers={cityOffers} onListItemHover={onListItemHover}
                    handleClickToBookMark={handleClickToBookMark}
                  />
                </div>
              </section>
              :
              <MainEmpty currentCity={currentCity}/>}
            <div className="cities__right-section">
              <section className="cities__map map">
                <CitiesMap cityOffers={cityOffers} selectedCard={selectedCard} currentCity={currentCity}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
    :
    <Loader/>;
};

export default Main;

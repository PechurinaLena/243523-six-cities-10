import {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import Header from 'components/header';
import CitiesMap from 'components/cities-map';
import CardList from 'components/card-list';
import Loader from 'components/loader';
import ReviewList from 'components/review-list';
import HostCard from 'components/host-card';
import NotFound from 'pages/not-found';
import {useAppDispatch, useAppSelector} from 'hooks';
import {AppRoute, AuthorizationStatus, getRatingWidth, Titles} from 'components/app/const';
import {fetchNearbyOffersAction, fetchOfferAction, fetchOfferStatusAction} from 'store/api-actions';

export const Room: FC = () => {
  const [isNearByOffersUpdated, setNearByOffersUpdated] = useState(false);
  const [isOfferUpdated, setOfferUpdated] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const hotelId = Number(params.id);
  const dispatch = useAppDispatch();
  const {isDataLoaded, authorizationStatus} = useAppSelector((state) => state.USER);
  const {reviews} = useAppSelector((state) => state.COMMENTS);
  const {
    selectedCard,
    currentCity,
    nearbyOffers,
    isFavoriteOfferLoaded,
    currentOffer
  } = useAppSelector((state) => state.OFFERS);
  const isAuthorizedUser = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (!isOfferUpdated || !isFavoriteOfferLoaded) {
      dispatch(fetchOfferAction({hotelId}));
      setOfferUpdated(true);
    }
  }, [isOfferUpdated, hotelId, dispatch, isFavoriteOfferLoaded]);

  useEffect(() => {
    if (!isNearByOffersUpdated || !isFavoriteOfferLoaded) {
      dispatch(fetchNearbyOffersAction({hotelId}));
      setNearByOffersUpdated(true);
    }
  }, [isNearByOffersUpdated, hotelId, dispatch, isFavoriteOfferLoaded]);

  const handleClickToBookMark = () => {
    if (!isAuthorizedUser) {
      navigate(AppRoute.Login);
    }
    dispatch(fetchOfferStatusAction({
      hotelId: currentOffer ? currentOffer.id : 0,
      status: currentOffer?.isFavorite ? 0 : 1
    }));
    setOfferUpdated(true);
  };

  if (isDataLoaded) {
    return <Loader/>;
  }

  return currentOffer ?
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentOffer.images.map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt={image}/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
                <button
                  className={`property__bookmark-button ${currentOffer.isFavorite && 'property__bookmark-button--active'} button`}
                  type="button"
                  onClick={handleClickToBookMark}
                >
                  <svg className={`property__bookmark-icon ${currentOffer.isFavorite && 'place-card__bookmark-icon'}`}
                    width="31" height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRatingWidth(currentOffer.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentOffer.goods.map((inside) => (
                    <li key={inside} className="property__inside-item">{inside}</li>
                  ))}
                </ul>
              </div>
              <HostCard currentOffer={currentOffer}/>
              <ReviewList reviews={reviews} hotelId={hotelId} isAuthorizedUser={isAuthorizedUser}/>
            </div>
          </div>
          <section className="property__map map">
            <CitiesMap cityOffers={nearbyOffers?.concat(currentOffer)} currentCity={currentCity}
              selectedCard={selectedCard}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">{Titles.RoomNearByPlaces}</h2>
            <div className="near-places__list places__list">
              <CardList cityOffers={nearbyOffers}/>
            </div>
          </section>
        </div>
      </main>
    </div>
    :
    <NotFound/>;
};

export default Room;

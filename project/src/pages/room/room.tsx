import {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import Header from 'components/header';
import ReviewForm from 'components/review-form';
import CitiesMap from 'components/cities-map';
import CardList from 'components/card-list';
import Loader from 'components/loader';
import ReviewList from 'components/review-list';
import NotFound from 'pages/not-found';
import {useAppDispatch, useAppSelector} from 'hooks';
import {setSelectedPoint} from 'store/action';
import {AppRoute, AuthorizationStatus, getRatingWidth, Titles} from 'components/app/const';
import {fetchNearbyOffersAction, fetchOfferAction, fetchOfferStatusAction, fetchReviewsAction} from 'store/api-actions';


export const Room: FC = () => {
  const [isNearByOffersUpdated, setNearByOffersUpdated] = useState(false);
  const [isOfferUpdated, setOfferUpdated] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const hotelId = Number(params.id);
  const dispatch = useAppDispatch();
  const {
    selectedCard,
    currentCity,
    nearbyOffers,
    isFavoriteOfferLoaded,
    isDataLoaded,
    authorizationStatus,
    reviews,
    currentOffer,
  } = useAppSelector((state) => state);
  const isAuthorizedUser = authorizationStatus === AuthorizationStatus.Auth;

  const onListItemHover = (listItemId: number) => dispatch(setSelectedPoint(listItemId));

  useEffect(() => {
    if (!isOfferUpdated || !isFavoriteOfferLoaded) {
      dispatch(fetchOfferAction({hotelId}));
      setOfferUpdated(true);
    }
  }, [isOfferUpdated, hotelId, dispatch, isFavoriteOfferLoaded]);

  useEffect(() => {
    dispatch(fetchReviewsAction({hotelId}));
  }, [hotelId, dispatch]);

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

  if (!currentOffer || !hotelId) {
    return <NotFound/>;
  }

  return currentOffer && !isDataLoaded ?
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
                <b className="property__price-value">${currentOffer.price}</b>
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
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot;
                  <span className="reviews__amount">
                    {currentOffer.rating}
                  </span>
                </h2>
                <ReviewList reviews={reviews}/>
                {isAuthorizedUser &&
                  <ReviewForm/>}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <CitiesMap cityOffers={nearbyOffers} currentCity={currentCity} selectedCard={selectedCard}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">{Titles.RoomNearByPlaces}</h2>
            <div className="near-places__list places__list">
              <CardList cityOffers={nearbyOffers} onListItemHover={onListItemHover}/>
            </div>
          </section>
        </div>
      </main>
    </div>
    :
    <Loader/>;
};

export default Room;

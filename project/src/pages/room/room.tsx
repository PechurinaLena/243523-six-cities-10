import {FC} from 'react';
import {useParams} from 'react-router-dom';

import Header from 'components/header';
import ReviewForm from 'components/review-form';
import CitiesMap from 'components/cities-map';
import CardList from 'components/card-list';
import {useAppDispatch, useAppSelector} from 'hooks';
import {setSelectedPoint} from 'store/action';
import {Offer} from 'types/offers';
import {Titles} from 'types/const';
import {Reviews} from 'mocks/reviews';


export const Room: FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {selectedCard, offers, currentCity} = useAppSelector((state) => state);
  const onListItemHover = (listItemId: number) => dispatch(setSelectedPoint(listItemId));
  const property = offers.find((item: Offer) => item.id === Number(params.id));
  const foundCards = offers.filter((offer) => offer.city.name === currentCity.name);

  return (
    <div className="page">
      <Header/>
      {property &&
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                <div className="property__image-wrapper">
                  <img className="property__image" src="/img/room.jpg" alt=" "/>
                </div>
                <div className="property__image-wrapper">
                  <img className="property__image" src="/img/apartment-01.jpg" alt=" "/>
                </div>
                <div className="property__image-wrapper">
                  <img className="property__image" src="/img/apartment-02.jpg" alt=" "/>
                </div>
                <div className="property__image-wrapper">
                  <img className="property__image" src="/img/apartment-03.jpg" alt=" "/>
                </div>
                <div className="property__image-wrapper">
                  <img className="property__image" src="/img/studio-01.jpg" alt=" "/>
                </div>
                <div className="property__image-wrapper">
                  <img className="property__image" src="/img/apartment-01.jpg" alt=" "/>
                </div>
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {property.status &&
                  <div className="property__mark">
                    <span>{property.status}</span>
                  </div>}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {property.title}
                  </h1>
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: '80%'}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{property.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {property.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {property.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {property.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">{property.currency}{property.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {property.goods.map((inside) => (
                      <li key={inside} className="property__inside-item">{inside}</li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src="/img/avatar-angelina.jpg" width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">
                      {property.host.name}
                    </span>
                    {property.host.isPro &&
                      <span className="property__user-status">
                      Pro
                      </span>}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {property.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot;
                    <span className="reviews__amount">
                      {Reviews.length}
                    </span>
                  </h2>
                  {Reviews.map((review) => (
                    <ul className="reviews__list" key={review.id}>
                      <li className="reviews__item">
                        <div className="reviews__user user">
                          <div className="reviews__avatar-wrapper user__avatar-wrapper">
                            <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54"
                              height="54"
                              alt="Reviews avatar"
                            />
                          </div>
                          <span className="reviews__user-name">
                            {review.user.name}
                          </span>
                        </div>
                        <div className="reviews__info">
                          <div className="reviews__rating rating">
                            <div className="reviews__stars rating__stars">
                              <span style={{width: '80%'}}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <p className="reviews__text">
                            {review.comment}
                          </p>
                          <time className="reviews__time" dateTime="2019-04-24">{review.date}</time>
                        </div>
                      </li>
                    </ul>
                  ))}
                  <ReviewForm/>
                </section>
              </div>
            </div>
            <section className="property__map map">
              <CitiesMap foundCards={foundCards} currentCity={currentCity} selectedCard={selectedCard}/>
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">{Titles.RoomNearByPlaces}</h2>
              <div className="near-places__list places__list">
                <CardList foundCards={foundCards} onListItemHover={onListItemHover}/>
              </div>
            </section>
          </div>
        </main>}
    </div>
  );
};

export default Room;

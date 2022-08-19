import {FC, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {Offer} from 'types/offers';
import {AppRoute, getRatingWidth, transformRoute} from 'components/app/const';
import {fetchNearbyOffersAction, fetchOfferStatusAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';

export type CardProps = {
  card: Offer;
  onListItemHover: (listItemId: number) => void
  isAuthorizedUser: boolean
}

const Card: FC<CardProps> = ({card, onListItemHover, isAuthorizedUser}) => {
  const [isFavoriteOfferMarked, setFavoriteOfferMarked] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isFavoriteOfferLoaded} = useAppSelector((state) => state.OFFERS);

  const handleClickToBookMark = () => {
    if (!isAuthorizedUser) {
      navigate(AppRoute.Login);
    }
    dispatch(fetchOfferStatusAction({
      hotelId: card.id,
      status: isFavoriteOfferMarked ? 0 : 1
    }));

    setFavoriteOfferMarked(1);

    if (isFavoriteOfferLoaded) {
      dispatch(fetchNearbyOffersAction({hotelId: card.id}));
    }
  };

  return (
    <article className="cities__card place-card"
      onMouseEnter={() => onListItemHover(card.id)}
      onMouseLeave={() => onListItemHover(0)}
    >
      {card.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={(transformRoute(`${AppRoute.Room}/${card.id}`))}>
          <img className="place-card__image" src={card.previewImage} width="260" height="200"
            alt={''}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{card.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${card.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button" onClick={handleClickToBookMark}
          >
            <svg
              className="place-card__bookmark-icon"
              width="18" height="19"
            >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingWidth(card.rating)}%`}}></span>
            <span className="visually-hidden">{card.rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={(transformRoute(`${AppRoute.Room}/${card.id}`))}>{card.title}</Link>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
};

export default Card;

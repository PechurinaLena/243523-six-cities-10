import {FC, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

import {Offer} from 'types/offers';
import {fetchNearbyOffersAction, fetchOfferStatusAction} from 'store/api-actions';
import {getFavoriteDataLoaded} from 'store/slices/data-process/selectors';
import {useAppDispatch, useAppSelector} from 'hooks';
import {AppRoute, FavoriteStatus, Numbers} from 'enums';
import {getRatingWidth, getTransformedRoute} from 'utils';

export type CardProps = {
  card: Offer
  onListItemHover: (listItemId: number) => void
  isAuthorizedUser: boolean
  isNearByCard?: boolean
}

const Card: FC<CardProps> = ({card, isAuthorizedUser, onListItemHover, isNearByCard}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isFavoriteOfferLoaded = useAppSelector(getFavoriteDataLoaded);

  useEffect(() => {
    window.scrollTo(Numbers.Zero, Numbers.Zero);
  }, [location]);

  const handleBookMarkClick = () => {
    if (isAuthorizedUser) {
      dispatch(fetchOfferStatusAction({
        hotelId: card.id,
        status: card.isFavorite ? FavoriteStatus.Remove : FavoriteStatus.Add
      }));
      if (isFavoriteOfferLoaded) {
        dispatch(fetchNearbyOffersAction({hotelId: card.id}));
      }
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <article className={`${isNearByCard ? 'near-places__card' : 'cities__card'} place-card`}
      onMouseEnter={() => onListItemHover(card.id)}
      onMouseLeave={() => onListItemHover(Numbers.Zero)}
    >
      {card.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={(getTransformedRoute(`${AppRoute.Room}/${card.id}`))}>
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
            type="button" onClick={handleBookMarkClick}
          >
            <svg
              className="place-card__bookmark-icon"
              width="18" height="19"
            >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{card.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingWidth(card.rating)}%`}}></span>
            <span className="visually-hidden">{card.rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={(getTransformedRoute(`${AppRoute.Room}/${card.id}`))}>{card.title}</Link>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
};

export default Card;

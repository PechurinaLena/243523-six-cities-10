import {FC} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {getAuthorizationStatus} from 'store/slices/user-process/selectors';
import {fetchOfferStatusAction} from 'store/api-actions';
import {Offer} from 'types/offers';
import {AppRoute, AuthorizationStatus, FavoriteStatus} from 'enums';
import {useAppDispatch, useAppSelector} from 'hooks';
import {getRatingWidth, getTransformedRoute} from 'utils';

export type FavoriteCardProps = {
  offersByCity: Offer[];
}

export const FavoriteCard: FC<FavoriteCardProps> = ({offersByCity}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorizedUser = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <>
      {offersByCity.map((offer) => (
        <article className="favorites__card place-card" key={offer.id}>
          <div className="favorites__image-wrapper place-card__image-wrapper">
            <Link to={(getTransformedRoute(`${AppRoute.Room}/${offer.id}`))}>
              <img className="place-card__image" src={offer.previewImage} width="150"
                height="110"
                alt={''}
              />
            </Link>
          </div>
          <div className="favorites__card-info place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;{offer.price}</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button
                className="place-card__bookmark-button place-card__bookmark-button--active button"
                type="button" onClick={() => {
                  if (!isAuthorizedUser) {
                    navigate(AppRoute.Login);
                  }
                  dispatch(fetchOfferStatusAction({
                    hotelId: offer.id,
                    status: offer?.isFavorite ? FavoriteStatus.Remove : FavoriteStatus.Add
                  }));
                }}
              >
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">{(offer.isFavorite) ? 'In bookmarks' : 'To bookmarks'}</span>
              </button>
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{width: `${getRatingWidth(offer.rating)}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <Link
                to={(getTransformedRoute(`${AppRoute.Room}/${offer.id}`))}
              >{offer.title}
              </Link>
            </h2>
            <p className="place-card__type">{offer.type}</p>
          </div>
        </article>
      ))}
    </>
  );
};
export default FavoriteCard;

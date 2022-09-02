import {FC} from 'react';

import Card from 'components/card';
import {Offer} from 'types/offers';
import {setSelectedPoint} from 'store/slices/offers-process/offers-process';
import {getAuthorizationStatus} from 'store/slices/user-process/selectors';
import {useAppDispatch, useAppSelector} from 'hooks';
import {AuthorizationStatus} from 'enums';

export type CardListProps = {
  cityOffers: Offer[];
  isNearByCard?: boolean;
}

export const CardList: FC<CardListProps> = ({cityOffers, isNearByCard}) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorizedUser = authorizationStatus === AuthorizationStatus.Auth;

  const onListItemHover = (listItemId: number) => dispatch(setSelectedPoint(listItemId));

  return (
    <>
      {cityOffers.map((card) => (
        <Card card={card} key={card.id}
          isAuthorizedUser={isAuthorizedUser}
          onListItemHover={onListItemHover}
          isNearByCard={isNearByCard}
        />
      ))}
    </>
  );
};

export default CardList;

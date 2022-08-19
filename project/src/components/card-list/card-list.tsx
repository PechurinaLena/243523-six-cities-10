import {FC} from 'react';

import Card from 'components/card';
import {Offer} from 'types/offers';

export type CardListProps = {
  cityOffers: Offer[];
  onListItemHover: (listItemId: number) => void;
  isAuthorizedUser: boolean
}

export const CardList: FC<CardListProps> = ({cityOffers, onListItemHover, isAuthorizedUser}) => (
  <>
    {cityOffers.map((card) => (
      <Card card={card} key={card.id}
        onListItemHover={onListItemHover}
        isAuthorizedUser={isAuthorizedUser}
      />
    ))}
  </>
);

export default CardList;

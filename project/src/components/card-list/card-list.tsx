import {FC} from 'react';

import Card from 'components/card';
import {Offer} from 'types/offers';

export type CardListProps = {
  cityOffers: Offer[];
  onListItemHover: (listItemId: number) => void;
}

export const CardList: FC<CardListProps> = ({cityOffers, onListItemHover}) => (
  <>
    {cityOffers.map((card) => (
      <Card card={card} key={card.id}
        onListItemHover={onListItemHover}
      />
    ))}
  </>
);

export default CardList;

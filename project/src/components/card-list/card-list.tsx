import {FC} from 'react';

import Card from 'components/card';
import {Offer} from 'types/offers';

export type CardListProps = {
  foundCards: Offer[];
  onListItemHover: (listItemId: number) => void;
}

export const CardList: FC<CardListProps> = ({foundCards, onListItemHover}) => (
  <>
    {foundCards.map((card) => (
      <Card card={card} key={card.id}
        onListItemHover={onListItemHover}
      />
    ))}
  </>
);

export default CardList;

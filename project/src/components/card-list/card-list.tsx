import {FC} from 'react';

import Card from 'components/card';
import {Offer} from 'types/offers';

export type CardListProps = {
  foundCards: Offer[];
  onListItemHover: (listItemId: number) => void;
}

export const CardList: FC<CardListProps> = ({foundCards, onListItemHover}) => (
  <div className="cities__places-list places__list tabs__content">
    {foundCards.map((card) => (
      <Card card={card} key={card.id}
        onListItemHover={onListItemHover}
      />
    ))}
  </div>
);

export default CardList;

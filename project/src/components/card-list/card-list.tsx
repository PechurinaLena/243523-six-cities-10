import {FC} from 'react';

import Card from 'components/card';
import {Offer} from 'types/offers';

export type CardListProps = {
  cityOffers: Offer[];
  onListItemHover: (listItemId: number) => void;
  handleClickToBookMark?: () => void;
}

export const CardList: FC<CardListProps> = ({cityOffers, onListItemHover, handleClickToBookMark}) => (
  <>
    {cityOffers.map((card) => (
      <Card card={card} key={card.id}
        onListItemHover={onListItemHover}
        handleClickToBookMark={handleClickToBookMark}
      />
    ))}
  </>
);

export default CardList;

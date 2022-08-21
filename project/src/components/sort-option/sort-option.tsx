import React, {FC} from 'react';

import {SortType} from 'components/app/const';

export type SortOptionProps = {
  handleChangeOption: (option: string) => void
  isSortOptionsShown: boolean
  sortOffers: string
}

export const SortOption: FC<SortOptionProps> = ({isSortOptionsShown, sortOffers, handleChangeOption}) => (
  <ul className={`${isSortOptionsShown ? 'places__options--opened' : ''} places__options places__options--custom`}>
    {Object.values(SortType).map((option, index) => (
      <li
        key={option}
        tabIndex={index + 1}
        className={`places__option ${option === sortOffers && 'places__option--active'}`}
        onMouseEnter={() => {
          handleChangeOption(option);
        }}
      >
        {option}
      </li>
    )
    )}
  </ul>
);

export default React.memo(SortOption);

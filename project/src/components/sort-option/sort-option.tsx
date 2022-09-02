import {FC} from 'react';

import {SortType} from 'enums';

export type SortOptionProps = {
  handleSortOptionChange: (option: string) => void
  isSortOptionsShown: boolean
  sortOffers: string
}

export const SortOption: FC<SortOptionProps> = ({isSortOptionsShown, sortOffers, handleSortOptionChange}) => (
  <ul className={`${isSortOptionsShown ? 'places__options--opened' : ''} places__options places__options--custom`}>
    {Object.values(SortType).map((option, index) => (
      <li
        key={option}
        tabIndex={index + 1}
        className={`places__option ${option === sortOffers && 'places__option--active'}`}
        onClick={() => {
          handleSortOptionChange(option);
        }}
      >
        {option}
      </li>
    )
    )}
  </ul>
);

export default SortOption;

import {FC} from 'react';
import {sortType} from 'types/const';

export type SortOptionProps = {
  sortOffers: string;
  isSortOptionsShown: boolean;
  handleChangeVisibleOptions: (value: boolean) => void;
  handleChangeOption: (option: string) => void;
}

export const SortOptions: FC<SortOptionProps> = ({
  sortOffers,
  isSortOptionsShown,
  handleChangeVisibleOptions,
  handleChangeOption,
}) => (
  <form className="places__sorting" action="#" method="get"
    onClick={() => handleChangeVisibleOptions(!isSortOptionsShown)}
  >
    <span className="places__sorting-caption">Sort by {''}</span>
    <span className="places__sorting-type" tabIndex={0}>
      {sortOffers}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className={`${isSortOptionsShown ? 'places__options--opened' : ''} places__options places__options--custom`}>
      {Object.values(sortType).map((option, index) => (
        <li
          key={option}
          tabIndex={index + 1}
          className={`places__option ${option === sortOffers ? 'places__option--active' : ' '}`}
          onMouseEnter={() => {
            handleChangeOption(option);
          }}
        >
          {option}
        </li>
      )
      )}
    </ul>
  </form>
);

export default SortOptions;

import React, {FC} from 'react';

import SortOption from 'components/sort-option';
import {useAppDispatch, useAppSelector} from 'hooks';
import {getOptionsShown, getSortingOffers} from 'store/slices/data-process/selectors';
import {setOptionsShown, setSortingOffers} from 'store/slices/data-process/data-process';

export const SortForm: FC = () => {
  const dispatch = useAppDispatch();
  const sortOffers = useAppSelector(getSortingOffers);
  const isSortOptionsShown = useAppSelector(getOptionsShown);

  const handleChangeVisibleOptions = (value: boolean) => {
    dispatch(setOptionsShown(value));
  };

  const handleChangeOption = (option: string) => {
    dispatch(setSortingOffers(option));
  };

  return (
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
      <SortOption isSortOptionsShown={isSortOptionsShown} sortOffers={sortOffers}
        handleChangeOption={handleChangeOption}
      />
    </form>
  );
};

export default SortForm;

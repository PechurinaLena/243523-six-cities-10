import React, {FC} from 'react';

import SortOption from 'components/sort-option';
import {setOptionsShown, setSortingOffers} from 'store/reducers/offer/action';
import {useAppDispatch, useAppSelector} from 'hooks';

export const SortForm: FC = () => {
  const dispatch = useAppDispatch();
  const {sortOffers, isSortOptionsShown} = useAppSelector((state) => state.OFFERS);

  const handleChangeVisibleOptions = (value: boolean) => {
    dispatch(setOptionsShown(value));
  };

  const handleChangeOption = React.useCallback((option: string) => {
    dispatch(setSortingOffers(option));
  }, [dispatch]
  );

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

import {createReducer} from '@reduxjs/toolkit';

import {setActiveCity, setOptionsShown, setSelectedPoint, setSortingOffers} from 'store/action';
import {City, Offer} from 'types/offers';
import {offers} from 'mocks/offers';
import {sortType} from 'types/const';


export type Data = {
  offers: Offer[],
  currentCity: City,
  selectedCard: number,
  sortOffers: string,
  isSortOptionsShown: boolean,
}

export const initialState: Data = {
  offers: offers,
  currentCity: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 11,
    },
    name: 'Paris',
  },
  selectedCard: 0,
  sortOffers: sortType.Popular,
  isSortOptionsShown: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSelectedPoint, (state, action) => {
      state.selectedCard = action.payload;
    })
    .addCase(setActiveCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOptionsShown, (state, action) => {
      state.isSortOptionsShown = action.payload;
    })
    .addCase(setSortingOffers, (state, action) => {
      state.sortOffers = action.payload;
    });
});

export {reducer};

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
  cityOffers: Offer[],
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
  cityOffers: [offers[4]],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSelectedPoint, (state, action) => {
      state.selectedCard = action.payload;
    })
    .addCase(setActiveCity, (state, action) => {
      state.currentCity = action.payload;
      state.cityOffers = state.offers.filter((offer) => offer.city.name === state.currentCity.name);
    })
    .addCase(setOptionsShown, (state, action) => {
      state.isSortOptionsShown = action.payload;
    })
    .addCase(setSortingOffers, (state, action) => {
      state.sortOffers = action.payload;

      function getSortingOffers(offer: Offer[], type: 'ASC' | 'DESC', key: keyof Pick<Offer, 'id' | 'price' | 'rating'>) {
        return offer.sort((a, b) => type === 'ASC' ? a[key] - b[key] : b[key] - a[key]);
      }

      switch (action.payload) {
        case sortType.Popular:
          state.cityOffers = getSortingOffers(state.cityOffers, 'ASC', 'id');
          break;
        case sortType.PriceLowToHigh:
          state.cityOffers = getSortingOffers(state.cityOffers, 'ASC', 'price');
          break;
        case sortType.PriceHighToLow:
          state.cityOffers = getSortingOffers(state.cityOffers, 'DESC', 'price');
          break;
        case sortType.TopRated:
          state.cityOffers = getSortingOffers(state.cityOffers, 'DESC', 'rating');
          break;
      }
    });
});

export {reducer};

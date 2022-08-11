import {createReducer} from '@reduxjs/toolkit';

import {
  loadFavoritesOffers,
  loadOffers,
  requireAuthorization,
  setActiveCity,
  setDataLoadedStatus,
  setOptionsShown,
  setSelectedPoint,
  setSortingOffers
} from 'store/action';
import {City, Offer} from 'types/offers';
import {AuthorizationStatus, sortType} from 'components/app/const';


export type Data = {
  offers: Offer[],
  favoritesOffers: Offer[],
  currentCity: City,
  selectedCard: number,
  sortOffers: string,
  isSortOptionsShown: boolean,
  cityOffers: Offer[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
}

export const initialState: Data = {
  offers: [],
  favoritesOffers: [],
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
  cityOffers: [],
  authorizationStatus: AuthorizationStatus.NoAuth,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadFavoritesOffers, (state, action) => {
      state.favoritesOffers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
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

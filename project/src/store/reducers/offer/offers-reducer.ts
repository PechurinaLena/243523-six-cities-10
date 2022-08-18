import {createReducer} from '@reduxjs/toolkit';

import {City, Offer} from 'types/offers';
import {SortType} from 'components/app/const';
import {
  loadFavoritesOffers,
  loadNearbyOffers,
  loadOffers,
  setActiveCity,
  setCurrentOffer,
  setFavoriteOfferLoaded,
  setOptionsShown,
  setSelectedPoint,
  setSortingOffers
} from './action';

export type Data = {
  offers: Offer[],
  currentOffer: Offer | null,
  favoritesOffers: Offer[],
  nearbyOffers: Offer[],
  currentCity: City,
  selectedCard: number,
  isFavoriteOfferLoaded: boolean,
  sortOffers: string,
  isSortOptionsShown: boolean,
}

export const initialState: Data = {
  offers: [],
  currentOffer: null,
  favoritesOffers: [],
  nearbyOffers: [],
  currentCity: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 11,
    },
    name: 'Paris',
  },
  selectedCard: 0,
  isFavoriteOfferLoaded: false,
  sortOffers: SortType.Popular,
  isSortOptionsShown: false,
};

const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadFavoritesOffers, (state, action) => {
      state.favoritesOffers = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setFavoriteOfferLoaded, (state, action) => {
      state.isFavoriteOfferLoaded = action.payload;
    })
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

      function getSortingOffers(offer: Offer[], type: 'ASC' | 'DESC', key: keyof Pick<Offer, 'id' | 'price' | 'rating'>) {
        return offer.sort((a, b) => type === 'ASC' ? a[key] - b[key] : b[key] - a[key]);
      }

      switch (action.payload) {
        case SortType.Popular:
          state.offers = getSortingOffers(state.offers, 'ASC', 'id');
          break;
        case SortType.PriceLowToHigh:
          state.offers = getSortingOffers(state.offers, 'ASC', 'price');
          break;
        case SortType.PriceHighToLow:
          state.offers = getSortingOffers(state.offers, 'DESC', 'price');
          break;
        case SortType.TopRated:
          state.offers = getSortingOffers(state.offers, 'DESC', 'rating');
          break;
      }
    });
});

export {offersReducer};

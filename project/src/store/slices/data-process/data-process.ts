import {createSlice} from '@reduxjs/toolkit';

import {DataProcess, getSortOffers, NameSpace, SortType} from 'components/app/const';

import {
  fetchFavoritesOffersAction,
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchOfferStatusAction
} from 'store/api-actions';

export const initialState: DataProcess = {
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
  isFavoriteOfferLoaded: false,
  sortOffers: SortType.Popular,
  isSortOptionsShown: false,
  isDataLoaded: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setSortingOffers: (state, action) => {
      state.sortOffers = action.payload;

      switch (action.payload) {
        case SortType.Popular:
          state.offers = getSortOffers(state.offers, 'ASC', 'id');
          break;
        case SortType.PriceLowToHigh:
          state.offers = getSortOffers(state.offers, 'ASC', 'price');
          break;
        case SortType.PriceHighToLow:
          state.offers = getSortOffers(state.offers, 'DESC', 'price');
          break;
        case SortType.TopRated:
          state.offers = getSortOffers(state.offers, 'DESC', 'rating');
          break;
      }
    },
    setOptionsShown: (state, action) => {
      state.isSortOptionsShown = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchFavoritesOffersAction.pending, (state) => {
        state.isFavoriteOfferLoaded = true;
      })
      .addCase(fetchFavoritesOffersAction.fulfilled, (state, action) => {
        state.favoritesOffers = action.payload;
        state.isFavoriteOfferLoaded = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchOfferStatusAction.pending, (state) => {
        state.isFavoriteOfferLoaded = true;
      })
      .addCase(fetchOfferStatusAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isFavoriteOfferLoaded = false;
        state.offers = state.offers.map((offer) => offer.id === action.payload.id ?
          {...offer, isFavorite: action.payload.isFavorite} : offer);
        if (action.payload.isFavorite) {
          state.favoritesOffers = [...state.favoritesOffers, action.payload];
        } else {
          state.favoritesOffers = state.favoritesOffers.filter(({id}) => id !== action.payload.id);
        }
      });
  }
});

export const {setSortingOffers, setOptionsShown} = dataProcess.actions;

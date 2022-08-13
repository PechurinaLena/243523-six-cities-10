import {createReducer} from '@reduxjs/toolkit';

import {
  loadFavoritesOffers,
  loadNearbyOffers,
  loadOffers,
  loadReviews,
  loadUser,
  postReview,
  requireAuthorization,
  setActiveCity,
  setCurrentOffer,
  setDataLoadedStatus,
  setFavoriteOfferLoaded,
  setOptionsShown,
  setReviewLoaded,
  setSelectedPoint,
  setSortingOffers
} from 'store/action';
import {City, Offer} from 'types/offers';
import {Reviews} from 'types/reviews';
import {AuthorizationStatus, SortType} from 'components/app/const';
import {UserData} from '../types/user-data';


export type Data = {
  user: UserData | null,
  offers: Offer[],
  currentOffer: Offer | null,
  favoritesOffers: Offer[],
  nearbyOffers: Offer[],
  currentCity: City,
  selectedCard: number,
  reviews: Reviews[],
  newReview: Reviews | null,
  sortOffers: string,
  isSortOptionsShown: boolean,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  isFavoriteOfferLoaded: boolean,
  isReviewLoaded: boolean,
}

export const initialState: Data = {
  user: null,
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
  reviews: [],
  newReview: null,
  sortOffers: SortType.Popular,
  isSortOptionsShown: false,
  authorizationStatus: AuthorizationStatus.NoAuth,
  isDataLoaded: false,
  isFavoriteOfferLoaded: false,
  isReviewLoaded: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUser, (state, action) => {
      state.user = action.payload;
    })
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
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(postReview, (state, action) => {
      state.newReview = action.payload;
    })
    .addCase(setReviewLoaded, (state, action) => {
      state.isReviewLoaded = action.payload;
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

export {reducer};

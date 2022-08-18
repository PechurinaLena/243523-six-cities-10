import {createAction} from '@reduxjs/toolkit';

import {City, Offer} from 'types/offers';

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const loadFavoritesOffers = createAction<Offer[]>('data/loadFavoritesOffers');
export const loadNearbyOffers = createAction<Offer[]>('data/loadNearbyOffers');

export const setSelectedPoint = createAction('offers/setSelectedPoint', (value: Offer['id']) => ({payload: value}));
export const setActiveCity = createAction<City>('offers/setActiveCity');
export const setCurrentOffer = createAction<Offer>('room/setCurrentOffer');
export const setFavoriteOfferLoaded = createAction<boolean>('data/setFavoriteOfferLoaded');

export const setSortingOffers = createAction<string>('offers/setSortingOffers');
export const setOptionsShown = createAction<boolean>('offers/setOptionsShown');

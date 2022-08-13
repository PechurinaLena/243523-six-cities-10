import {createAction} from '@reduxjs/toolkit';

import {City, Offer} from 'types/offers';
import {Reviews} from 'types/reviews';
import {UserData} from 'types/user-data';
import {AppRoute, AuthorizationStatus} from 'components/app/const';

export const setSelectedPoint = createAction('offers/setSelectedPoint', (value: Offer['id']) => ({payload: value}));
export const setActiveCity = createAction<City>('offers/setActiveCity');
export const setSortingOffers = createAction<string>('offers/setSortingOffers');
export const setOptionsShown = createAction<boolean>('offers/setOptionsShown');
export const setCurrentOffer = createAction<Offer>('room/setCurrentOffer');

export const loadUser = createAction<UserData>('data/loadUser');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const loadFavoritesOffers = createAction<Offer[]>('data/loadFavoritesOffers');
export const setFavoriteOfferLoaded = createAction<boolean>('data/setFavoriteOfferLoaded');
export const loadNearbyOffers = createAction<Offer[]>('data/loadNearbyOffers');
export const loadReviews = createAction<Reviews[]>('data/loadReviews');
export const postReview = createAction<Reviews>('data/postNewReview');
export const setReviewLoaded = createAction<boolean>('data/setReviewLoaded');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');

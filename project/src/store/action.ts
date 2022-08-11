import {createAction} from '@reduxjs/toolkit';
import {City, Offer} from 'types/offers';
import {AppRoute, AuthorizationStatus} from 'types/const';

export const setSelectedPoint = createAction('offers/setSelectedOffers', (value: Offer['id']) => ({payload: value}));
export const setActiveCity = createAction('offers/setActiveCity', (value: City) => ({payload: value}));
export const setSortingOffers = createAction('offers/setSortingOffers', (value: string) => ({payload: value}));
export const setOptionsShown = createAction('offers/setSortOptionsShown', (value: boolean) => ({payload: value}));

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const loadFavoritesOffers = createAction<Offer[]>('data/loadFavoritesOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');

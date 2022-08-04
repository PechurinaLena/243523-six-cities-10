import {createAction} from '@reduxjs/toolkit';
import {City, Offer} from 'types/offers';

export const setSelectedPoint = createAction('set selected offer', (value: Offer['id']) => ({payload: value}));
export const setActiveCity = createAction('main/set active city', (value: City) => ({payload: value}));
export const setSortingOffers = createAction('offers/set sorting offers', (value: string) => ({payload: value}));
export const setOptionsShown = createAction('offers/set options shown', (value: boolean) => ({payload: value}));

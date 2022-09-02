import {State} from 'types/state';
import {Offer} from 'types/offers';
import {NameSpace} from 'enums';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getCurrentOffer = (state: State): Offer | undefined => state[NameSpace.Data].currentOffer;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.Data].nearbyOffers;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoritesOffers;
export const getFavoriteDataLoaded = (state: State): boolean => state[NameSpace.Data].isFavoriteOfferLoaded;
export const getDataLoaded = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getSortingOffers = (state: State): string => state[NameSpace.Data].sortOffers;
export const getOptionsShown = (state: State): boolean => state[NameSpace.Data].isSortOptionsShown;

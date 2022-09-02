import {City, Offer} from './offers';
import {UserData} from './user-data';
import {Review} from './reviews';
import {AuthorizationStatus} from 'enums';

export type DataProcess = {
  offers: Offer[],
  currentOffer: Offer | undefined,
  favoritesOffers: Offer[],
  nearbyOffers: Offer[],
  currentCity: City,
  isFavoriteOfferLoaded: boolean,
  sortOffers: string,
  isSortOptionsShown: boolean,
  isDataLoaded: boolean,
}

export type OffersProcess = {
  offers: Offer[],
  currentCity: City,
  selectedCard: number,
  sortOffers: string,
  isSortOptionsShown: boolean,
}

export type UserProcess = {
  user: UserData | null,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
}

export type ReviewsProcess = {
  reviews: Review[],
  newReview: Review | null,
  isReviewLoaded: boolean,
  isDataLoaded: boolean
}

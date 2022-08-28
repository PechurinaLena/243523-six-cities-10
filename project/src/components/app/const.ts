import {City, Offer} from 'types/offers';
import {UserData} from 'types/user-data';
import {Reviews} from 'types/reviews';

export enum AppRoute {
  Login = '/login',
  Root = '/',
  Room = '/offer',
  Favorites = '/favorites'
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Comments = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  UnKnown = 'Unknown'
}

export enum Titles {
  LoginSignIn = 'Sign in',
  MainCities = 'Cities',
  MainPlaces = 'Places',
  FavoriteTitle = 'Saved listing',
  RoomNearByPlaces = 'Other places in the neighbourhood'
}

export const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRated: 'Top rated first',
};

export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
  Offers = 'OFFERS',
  Comments = 'COMMENTS',
}

export enum FavoriteStatus {
  Remove = 0,
  Add = 1
}

export enum Numbers {
  Zero = 0,
  Five = 5,
}

export type DataProcess = {
  offers: Offer[],
  currentOffer: Offer | null,
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
  reviews: Reviews[],
  newReview: Reviews | null,
  isReviewLoaded: boolean,
  isDataLoaded: boolean
}

export const RatingStars = [
  {id: 1, title: 'terribly'},
  {id: 2, title: 'badly'},
  {id: 3, title: 'not bad'},
  {id: 4, title: 'good'},
  {id: 5, title: 'perfect'}
];

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.UnKnown;

export const getSortOffers = (offer: Offer[], type: 'ASC' | 'DESC', key: keyof Pick<Offer, 'id' | 'price' | 'rating'>) =>
  offer.sort((a, b) => type === 'ASC' ? a[key] - b[key] : b[key] - a[key]);

export const getRatingWidth = (value: number) => Math.round(value) / 5 * 100;

export const getRandomCity = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const paramPattern = /:\w+/;
export const transformRoute = (uri: string, value?: string): string => uri.replace(paramPattern, value || '');

export const COMMENT_MIN_LENGTH = 50;

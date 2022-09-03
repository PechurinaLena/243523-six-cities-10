import {Offer} from 'types/offers';
import {Review} from './types/reviews';
import {PARAM_PATTERN} from 'const';
import {AuthorizationStatus} from 'enums';

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.UnKnown;

export const getSortOffers = (offer: Offer[], type: 'ASC' | 'DESC', key: keyof Pick<Offer, 'id' | 'price' | 'rating'>) =>
  offer.sort((a, b) => type === 'ASC' ? a[key] - b[key] : b[key] - a[key]);

export const getRatingWidth = (value: number) => Math.round(value) / 5 * 100;

export const getRandomCity = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getTransformedRoute = (uri: string, value?: string): string => uri.replace(PARAM_PATTERN, value || '');

export const compareDates = (reviewA: Review, reviewB: Review) => +new Date(reviewB.date) - +new Date(reviewA.date);

import {Review} from 'types/reviews';
import {NameSpace} from 'enums';
import {State} from 'types/state';

export const getReviews = (state: State): Review[] => state[NameSpace.Comments].reviews;
export const getReviewLoaded = (state: State): boolean => state[NameSpace.Comments].isReviewLoaded;

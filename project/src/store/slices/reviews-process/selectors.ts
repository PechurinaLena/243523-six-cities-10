import {Reviews} from 'types/reviews';
import {NameSpace} from 'components/app/const';
import {State} from 'types/state';

export const getReviews = (state: State): Reviews[] => state[NameSpace.Comments].reviews;
export const postReview = (state: State): Reviews | null => state[NameSpace.Comments].newReview;
export const getReviewLoaded = (state: State): boolean => state[NameSpace.Comments].isReviewLoaded;

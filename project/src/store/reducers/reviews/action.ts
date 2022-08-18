import {createAction} from '@reduxjs/toolkit';

import {Reviews} from 'types/reviews';

export const loadReviews = createAction<Reviews[]>('data/loadReviews');
export const postReview = createAction<Reviews>('data/postNewReview');
export const setReviewLoaded = createAction<boolean>('data/setReviewLoaded');

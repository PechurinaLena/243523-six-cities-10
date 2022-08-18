import {createReducer} from '@reduxjs/toolkit';

import {Reviews} from 'types/reviews';
import {loadReviews, postReview, setReviewLoaded} from './action';

export type Review = {
  reviews: Reviews[],
  newReview: Reviews | null,
  isReviewLoaded: boolean,
}

export const initialState: Review = {
  reviews: [],
  newReview: null,
  isReviewLoaded: false
};

const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(postReview, (state, action) => {
      state.newReview = action.payload;
    })
    .addCase(setReviewLoaded, (state, action) => {
      state.isReviewLoaded = action.payload;
    });
});

export {commentsReducer};

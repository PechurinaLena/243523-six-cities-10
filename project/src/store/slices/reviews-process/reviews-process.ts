import {createSlice} from '@reduxjs/toolkit';

import {fetchNewReviewAction, fetchReviewsAction} from 'store/api-actions';
import {ReviewsProcess} from 'types/process';
import {NameSpace} from 'enums';

export const initialState: ReviewsProcess = {
  reviews: [],
  newReview: null,
  isReviewLoaded: false,
  isDataLoaded: false
};

export const reviewsProcess = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchNewReviewAction.pending, (state) => {
        state.isReviewLoaded = true;
      })
      .addCase(fetchNewReviewAction.fulfilled, (state, action) => {
        state.newReview = action.payload;
        state.isReviewLoaded = false;
      });
  }
});

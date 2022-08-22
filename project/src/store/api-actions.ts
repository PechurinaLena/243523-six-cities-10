import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from 'types/state.js';

import {dropToken, saveToken} from 'services/token';
import {AuthData} from 'types/auth-data';
import {UserData} from 'types/user-data';
import {Offer} from 'types/offers';
import {Reviews} from 'types/reviews';
import {APIRoute, AppRoute} from 'components/app/const';
import {redirectToRoute} from './action';

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dispatch(redirectToRoute(AppRoute.Root));
    dropToken();
  },
);

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'dataProcess/loadOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, { hotelId: number | undefined }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffer',
  async ({hotelId}, {extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${hotelId}`);
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], { hotelId: number | null }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadNearbyOffers',
  async ({hotelId}, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${hotelId}/nearby`);
    return data;
  },
);

export const fetchFavoritesOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadFavoritesOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  },
);

export const fetchOfferStatusAction = createAsyncThunk<Offer, { hotelId: number, status: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOfferStatus',
  async ({hotelId, status}, {dispatch, extra: api}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${hotelId}/${status}`);
    dispatch(fetchFavoritesOffersAction());
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Reviews[], { hotelId: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async ({hotelId}, {extra: api}) => {
    const {data} = await api.get<Reviews[]>(`${APIRoute.Comments}/${hotelId}`);
    return data;
  },
);

export const fetchNewReviewAction = createAsyncThunk<Reviews, { comment: string, rating: number, hotelId: number | undefined }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postNewReview',
  async ({comment, rating, hotelId}, {extra: api}) => {
    const {data} = await api.post<Reviews>(`${APIRoute.Comments}/${hotelId}`, {comment, rating});
    return data;
  }
);


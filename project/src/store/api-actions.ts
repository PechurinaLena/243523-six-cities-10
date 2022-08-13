import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from 'types/state.js';

import {
  loadFavoritesOffers,
  loadNearbyOffers,
  loadOffers,
  loadReviews,
  loadUser,
  postReview,
  redirectToRoute,
  requireAuthorization,
  setCurrentOffer,
  setDataLoadedStatus,
  setFavoriteOfferLoaded,
  setReviewLoaded,
} from 'store/action';
import {dropToken, saveToken} from 'services/token';
import {APIRoute, AppRoute, AuthorizationStatus} from 'components/app/const';
import {AuthData} from 'types/auth-data';
import {UserData} from 'types/user-data';
import {Offer} from 'types/offers';
import {Reviews} from 'types/reviews';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(loadUser(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
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
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadOffers(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchOfferAction = createAsyncThunk<void, { hotelId: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffer',
  async ({hotelId}, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${hotelId}`);
    dispatch(setDataLoadedStatus(true));
    dispatch(setCurrentOffer(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, { hotelId: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadNearbyOffers',
  async ({hotelId}, {dispatch, extra: api}) => {
    dispatch(setDataLoadedStatus(true));
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${hotelId}/nearby`);
    dispatch(loadNearbyOffers(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchFavoritesOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadFavoritesOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadFavoritesOffers(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchOfferStatusAction = createAsyncThunk<void, { hotelId: number, status: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOfferStatus',
  async ({hotelId, status}, {dispatch, extra: api}) => {
    await api.post<Offer>(`${APIRoute.Favorite}/${hotelId}/${status}`);
    dispatch(setFavoriteOfferLoaded(true));
    dispatch(fetchOfferAction({hotelId}));
    dispatch(fetchFavoritesOffersAction());
    dispatch(setFavoriteOfferLoaded(false));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, { hotelId: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async ({hotelId}, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews[]>(`${APIRoute.Reviews}/${hotelId}`);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadReviews(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchNewReviewAction = createAsyncThunk<void, { comment: string, rating: number, hotelId: number | undefined }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postNewReview',
  async ({comment, rating, hotelId}, {dispatch, extra: api}) => {
    const {data} = await api.post<Reviews>(`${APIRoute.Reviews}/${hotelId}`, {comment, rating});
    dispatch(setReviewLoaded(true));
    dispatch(postReview(data));
    dispatch(setReviewLoaded(false));
  }
);


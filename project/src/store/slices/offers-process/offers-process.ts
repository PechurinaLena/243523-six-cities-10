import {createSlice} from '@reduxjs/toolkit';

import {NameSpace, OffersProcess, SortType} from 'components/app/const';

export const initialState: OffersProcess = {
  offers: [],
  currentCity: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 11,
    },
    name: 'Paris',
  },
  selectedCard: 0,
  sortOffers: SortType.Popular,
  isSortOptionsShown: false,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setSelectedPoint: (state, action) => {
      state.selectedCard = action.payload;
    },
    setActiveCity: (state, action) => {
      state.currentCity = action.payload;
    },
  }
});

export const {setSelectedPoint, setActiveCity} = offersProcess.actions;

import {createReducer} from '@reduxjs/toolkit';

import {setActiveCity, setOptionsShown, setSelectedPoint, setSortingOffers} from 'store/action';
import {City, Offer} from 'types/offers';
import {offers} from 'mocks/offers';
import {sortType} from 'types/const';


export type Data = {
  offers: Offer[],
  currentCity: City,
  selectedCard: number,
  sortOffers: string,
  isSortOptionsShown: boolean,
  cityOffers: Offer[],
}

export const initialState: Data = {
  offers: offers,
  currentCity: {
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 11,
    },
    name: 'Paris',
  },
  selectedCard: 0,
  sortOffers: sortType.Popular,
  isSortOptionsShown: false,
  cityOffers: [
    {
      id: 5,
      type: 'Hotel',
      city: {
        name: 'Paris',
        location: {
          latitude: 48.864716,
          longitude: 2.349014,
          zoom: 3
        }
      },
      image: '/img/apartment-03.jpg',
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.\n' +
        'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
      currency: '€',
      price: 100,
      rating: 5,
      status: 'Premium',
      bedrooms: 2,
      isFavorite: true,
      isPremium: true,
      goods: ['wi-fi',
        ' Washing machine',
        'Towels',
        'Heating',
        'Coffee machine',
        'Baby seat',
        ' Kitchen',
        'Dishwasher',
        'Cabel TV',
        'Fridge'],
      host: {
        avatarUrl: '/img/avatar.svg',
        id: 1,
        isPro: true,
        name: 'Jassy',
      },
      images: ['string'],
      location: {
        latitude: 48.8454572,
        longitude: 2.324059,
        zoom: 3
      },
      maxAdults: 2,
      previewImage: 'string',
      title: 'Hôtel Le Littré',
    },
  ]
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setSelectedPoint, (state, action) => {
      state.selectedCard = action.payload;
    })
    .addCase(setActiveCity, (state, action) => {
      state.currentCity = action.payload;
      state.cityOffers = state.offers.filter((offer) => offer.city.name === state.currentCity.name);
    })
    .addCase(setOptionsShown, (state, action) => {
      state.isSortOptionsShown = action.payload;
    })
    .addCase(setSortingOffers, (state, action) => {
      state.sortOffers = action.payload;

      function getSortingOffers(offer: Offer[], type: 'ASC' | 'DESC', key: keyof Pick<Offer, 'id' | 'price' | 'rating'>) {
        return offer.sort((a, b) => type === 'ASC' ? a[key] - b[key] : b[key] - a[key]);
      }

      switch (action.payload) {
        case sortType.Popular:
          state.cityOffers = getSortingOffers(state.cityOffers, 'ASC', 'id');
          break;
        case sortType.PriceLowToHigh:
          state.cityOffers = getSortingOffers(state.cityOffers, 'ASC', 'price');
          break;
        case sortType.PriceHighToLow:
          state.cityOffers = getSortingOffers(state.cityOffers, 'DESC', 'price');
          break;
        case sortType.TopRated:
          state.cityOffers = getSortingOffers(state.cityOffers, 'DESC', 'rating');
          break;
      }
    });
});

export {reducer};

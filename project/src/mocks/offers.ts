import {Offer} from 'types/offers';

export const offers: Offer[] = [
  {
    id: 1,
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.371807,
        longitude: 4.896029,
        zoom: 3
      }
    },
    image: '/img/apartment-01.jpg',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.\n' +
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    currency: '€',
    price: 120,
    rating: 5,
    status: 'Premium',
    isPremium: true,
    isFavorite: true,
    bedrooms: 2,
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
      avatarUrl: '/img/avatar-angelina.jpg',
      id: 1,
      isPro: true,
      name: 'Jassy',
    },
    images: ['string'],
    location: {
      latitude: 52.3425562,
      longitude: 4.8715339,
      zoom: 3
    },
    maxAdults: 2,
    previewImage: 'string',
    title: 'Beautiful & luxurious studio at great location',
  },
  {
    id: 2,
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.371807,
        longitude: 4.896029,
        zoom: 3
      }
    },
    image: '/img/room.jpg',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.\n' +
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    currency: '€',
    price: 80,
    rating: 4,
    bedrooms: 1,
    isFavorite: false,
    isPremium: false,
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
      latitude: 52.3621763,
      longitude: 4.8781745,
      zoom: 3,
    },
    maxAdults: 2,
    previewImage: 'string',
    title: 'Wood and stone place',
  },
  {
    id: 3,
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.371807,
        longitude: 4.896029,
        zoom: 3
      }
    },
    image: '/img/apartment-02.jpg',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.\n' +
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    currency: '€',
    price: 132,
    rating: 3,
    bedrooms: 3,
    isPremium: false,
    isFavorite: false,
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
      latitude: 52.339882,
      longitude: 4.8709911,
      zoom: 3
    },
    maxAdults: 2,
    previewImage: 'string',
    title: 'Canal View Prinsengracht',
  },
  {
    id: 4,
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.371807,
        longitude: 4.896029,
        zoom: 3
      }
    },
    image: '/img/apartment-03.jpg',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.\n' +
      'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    currency: '€',
    price: 180,
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
      latitude: 52.3513974,
      longitude: 4.8720606,
      zoom: 3
    },
    maxAdults: 2,
    previewImage: 'string',
    title: 'Nice, cozy, warm big bed apartment',
  },
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
  {
    id: 6,
    type: 'Hotel',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.233334,
        longitude: 6.783333,
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
      latitude: 51.2274607,
      longitude: 6.7742944,
      zoom: 3
    },
    maxAdults: 2,
    previewImage: 'string',
    title: 'Hotel NH Düsseldorf City',
  },
];

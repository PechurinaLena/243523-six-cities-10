export enum AppRoute {
  Login = '/login',
  Root = '/',
  Room = '/offer',
  Favorites = '/favorites'
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite'
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  UnKnown = 'UnKnown'
}

export enum Titles {
  LoginSignIn = 'Sign in',
  MainCities = 'Cities',
  MainPlaces = 'Places',
  FavoriteTitle = 'Saved listing',
  RoomNearByPlaces = 'Other places in the neighbourhood'
}

export const sortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRated: 'Top rated first',
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.UnKnown;

export const paramPattern = /:\w+/;
export const transformRoute = (uri: string, value?: string): string => uri.replace(paramPattern, value || '');

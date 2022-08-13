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
  Favorite = '/favorite',
  Reviews = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  UnKnown = 'Unknown'
}

export enum Titles {
  LoginSignIn = 'Sign in',
  MainCities = 'Cities',
  MainPlaces = 'Places',
  FavoriteTitle = 'Saved listing',
  RoomNearByPlaces = 'Other places in the neighbourhood'
}

export const SortType = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRated: 'Top rated first',
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.UnKnown;

export const getRatingWidth = (value: number) => Math.round(value) / 5 * 100;
export const paramPattern = /:\w+/;
export const transformRoute = (uri: string, value?: string): string => uri.replace(paramPattern, value || '');

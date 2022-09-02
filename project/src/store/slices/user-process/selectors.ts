import {State} from 'types/state';
import {UserData} from 'types/user-data';
import {AuthorizationStatus, NameSpace} from 'enums';

export const getUser = (state: State): UserData | null => state[NameSpace.User].user;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

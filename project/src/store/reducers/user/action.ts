import {createAction} from '@reduxjs/toolkit';

import {UserData} from 'types/user-data';
import {AuthorizationStatus} from 'components/app/const';

export const loadUser = createAction<UserData>('data/loadUser');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

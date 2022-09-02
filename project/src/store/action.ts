import {createAction} from '@reduxjs/toolkit';

import {AppRoute} from 'enums';

export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');

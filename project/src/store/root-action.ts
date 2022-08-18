import {createAction} from '@reduxjs/toolkit';

import {AppRoute} from 'components/app/const';

export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');

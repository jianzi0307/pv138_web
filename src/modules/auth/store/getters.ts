import _ from 'lodash';
import { State } from './state';

export const isLogged = (state: State) => !_.isEmpty(state.token);
export const authToken = (state: State) => state.token;
export const currentUser = (state: State) => state.user;

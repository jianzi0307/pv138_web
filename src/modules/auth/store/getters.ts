import _ from 'lodash';
// import { State } from './state';

export const isLogged = (state: any) => !_.isEmpty(state.token);
export const authToken = (state: any) => state.token;
export const currentUser = (state: any) => state.user;

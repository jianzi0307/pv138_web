import _ from 'lodash';
// import { State } from './state';

export const isLogged = async (state: any) => {
    return !_.isEmpty(await state.token)
};
export const authToken = (state: any) => state.token;
export const currentUser = (state: any) => state.user;



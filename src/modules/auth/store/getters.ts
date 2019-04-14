import _ from 'lodash';

export const isLogged = ({ token }: any) => !_.isEmpty(token);
export const authToken = ({ token }: any) => token;
export const currentUser = ({ user }: any) => user;

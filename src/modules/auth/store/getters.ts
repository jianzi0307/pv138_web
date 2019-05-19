import _ from 'lodash';

// export const isLogged = async (state: any) => {
//     return !_.isEmpty(await state.token)
// };

export const isLogged = (state: any) => {
    return !_.isEmpty(state.token)
};
export const authToken = (state: any) => state.token;
export const currentUser = (state: any) => state.user;



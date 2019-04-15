// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import http from '@/utils/http'

// send login data and retrive a new token
export const postLogin = ({ username, password }: any) => {
  return http.post('/oauth/token', {
    grant_type: 'password',
    client_id: process.env.VUE_APP_AUTH_CLIENT_ID,
    client_secret: process.env.VUE_APP_AUTH_CLIENT_SECRET,
    username,
    password,
    scope: ''
  });
}

export const postRegister = (payload: any) => {
  return http.post('/auth/register', payload)
}

export const postSendSmsCode = (payload: any) => {
  return http.post('/c/sms', payload);
};

// get current user's data
export const loadUserData = () => http.get('/me').catch((err: any) => console.log(err))

// revoke current token
export const revokeToken = (token: string) => http.post('/oauth/tokens/' + token)

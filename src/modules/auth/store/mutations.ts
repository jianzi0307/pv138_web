import * as TYPES from './mutations-types'
// import { State } from './state'

// export type personIdentifier = 'adults' | 'juveniles' | 'children'
// export function INC (state: State, key: personIdentifier) {
//   state[key]++
// }
export default {
  [TYPES.SET_TOKEN](state: any, value: string) {
    state.token = value;
  },
  [TYPES.SET_USER](state: any, value: any) {
    state.user = value;
  },
  [TYPES.SET_USER_PERMISSION](state: any, value: any) {
    state.permission = value;
  }
}

import * as TYPES from './mutations-types'
import { State } from './state'

// export type personIdentifier = 'adults' | 'juveniles' | 'children'
// export function INC (state: State, key: personIdentifier) {
//   state[key]++
// }
export default {
  [TYPES.SET_TOKEN](state: State, value: string) {
    state.token = value
  },
  [TYPES.SET_USER](state: State, value: any) {
    state.user = value
  }
}

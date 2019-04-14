import * as TYPES from './mutations-types'

export default {
  [TYPES.SET_TOKEN](state: any, value: any) {
    state.token = value
  },
  [TYPES.SET_USER](state: any, value: any) {
    state.user = value
  }
}

import { MutationTree } from 'vuex'
import { RootState } from '@/store/state'
import * as types from './mutations-types'

const mutations: MutationTree<RootState> = {
  [types.SET_USER_INFO]: (state, userInfo: object) => {
    state.userInfo = userInfo
    console.log(state)
  }
}

export default mutations

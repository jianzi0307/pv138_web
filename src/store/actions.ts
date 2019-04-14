import { ActionTree } from 'vuex'
import { RootState } from '@/store/state'
import * as types from './mutations-types'

const actions: ActionTree<RootState, any> = {
  [types.GET_USER_INFO]: (context, params: object) => {
    context.commit(types.SET_USER_INFO, {
      username: 'admin'
    })
  }
}

export default actions

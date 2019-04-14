import { GetterTree } from 'vuex'
import { RootState } from '@/store/state'

const getters: GetterTree<RootState, any> = {
  isLoggedIn: (state) => {
    return !!state.userInfo
  }
}

export default getters

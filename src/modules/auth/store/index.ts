import { State } from './state';
import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

export default {
    module: {
        State,
        actions,
        mutations,
        getters
    }
}

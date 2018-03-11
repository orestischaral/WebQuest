import Vue from 'vue';
import Vuex from 'vuex';

import WebQuest from './WebQuest'
import user from './User'
import shared from './Shared'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    WebQuest: WebQuest,
    user: user,
    shared: shared
  }
})

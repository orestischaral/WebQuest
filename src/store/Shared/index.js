import * as firebase from 'firebase';

export default {
  state: {
    error: null,
    loading:false,
    userWebQuest: []
  },
  mutations:{
    setError(state, payload) {
        state.error = payload
    },
    setLoading(state, payload) {
        state.loading = payload
    },
    clearError(state, payload) {
        state.error = payload
        console.log(' clear error')
    },
    setUserQuest(state, payload) {
        state.userWebQuest = payload;
    }    
  },
  actions:{
    clearlogEr({ commit }) {
        commit('clearError');
    }
  },
  getters:{
    error(state) {
        return state.error
    },
    questList(state) {
        return state.userWebQuest;
    },
    quest(state) {
        return (questId) => {
            return state.userWebQuest.find((quest) => {
                return quest.id === questId
            })
        }
    }
  }
}
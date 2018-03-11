import * as firebase from 'firebase';

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    signTeacher({
      commit
    }, payload) {
      if (payload) {
        const newTeacher = {
          name: payload.name,
          surname: payload.surname,
          speciality: payload.role,
          id: payload.id,
          role: 'Teacher',
          status: 'false',
          thisEntry: new Date().toISOString()
        }
        firebase.database().ref('user').push(newTeacher)
          .catch((error) => {
            console.log(error)
          })
        commit('setUser', { ...this.user,
          role: this.role,
          name: payload.name,
          surname: payload.surname,
          specialty: payload.role
        })
      }
    },
    signStudent({
      commit
    }, payload) {
      if (payload) {
        console.log('insert Student in DB')
        const newStudent = {
          name: payload.name,
          surname: payload.surname,
          id: payload.id,
          class: payload.class,
          role: 'Student',
          status: 'false',
          thisEntry: new Date()
        }
        firebase.database().ref('user').push(newStudent)
          .catch((error) => {
            console.log(error)
          })
        commit('setUser', { ...this.user,
          role: this.role,
          name: payload.name,
          surname: payload.surname,
          class: payload.studentClass
        })
      }
    },
    signUser({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn({
      commit
    }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              role: ''
            }
            commit('setUser', newUser)
            let obj
            firebase.database().ref('user').orderByChild('id').equalTo(newUser.id).once('value', function (snapshot) {
                console.log(snapshot.val())
                snapshot.forEach(function (data) {
                  console.log(data.key)
                  obj = snapshot.val()
                  const newUser = {
                    id: obj[data.key].id,
                    name: obj[data.key].name,
                    surname: obj[data.key].surname,
                    role: obj[data.key].role,
                    key: data.key,
                    class: obj[data.key].class,
                    status: 'false',
                    speciality: obj[data.key].speciality,
                    thisEntry: new Date(),
                    assigned_quests: obj[data.key].assigned_quests
                  }
                  commit('setUser', newUser)
                  if (newUser.key !== undefined && newUser.key !== null) {
                    firebase.database().ref('user/' + newUser.key + '/status').set('true')
                  }
                })
              })
              .catch(
                error => {
                  commit('setLoading', false)
                  commit('setError', error)
                  console.log(error)
                }
              )
          })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn({
      commit
    }, payload) {
      commit('setLoading', false)
      const newUser = {
        id: payload.uid,
        role: ''
      }
      let obj
      firebase.database().ref('user').orderByChild('id').equalTo(newUser.id).once('value', function (snapshot) {
          snapshot.forEach(function (data) {
            obj = snapshot.val()
            const newUser = {
              id: obj[data.key].id,
              name: obj[data.key].name,
              surname: obj[data.key].surname,
              role: obj[data.key].role,
              key: data.key,
              class: obj[data.key].class,
              status: false,
              speciality: obj[data.key].speciality,
              thisEntry: new Date(),
              assigned_quests: obj[data.key].assigned_quests
            }
            commit('setUser', newUser);
            if (newUser.key !== undefined && newUser.key !== null) {
              return firebase.database().ref('user/' + newUser.key + '/status').set('true')
            }
          });
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signProcess({
      commit
    }) {
      firebase.auth().signOut();
      commit('setUser', null);
      commit('clearError');
    },
    logOut({
      commit
    }, payload) {
      var db = firebase.database().ref('user/' + payload.key + '/status')
      db.set('false')
        .then(function () {
          firebase.auth().signOut();
          commit('setUser', null);
          commit('setUserQuest', null);
          commit('clearError');
        })
        .catch(
          error => {
            commit('setLoading', false);
            commit('setError', error);
            console.log(error);
          }
        )
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
}

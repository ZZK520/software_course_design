import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, load) {
      return AuthService.login(load).then(
        data => {
          console.log('data', data);
          if (data.status == 200) {
            commit('loginSuccess', data.data);
          } else {
            commit('loginFailure');
          }
          return Promise.resolve(data);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
  },
  mutations: {
    loginSuccess(state, user) {
      console.log('loginSuccess');

      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      console.log('loginFailure');
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
  }
};

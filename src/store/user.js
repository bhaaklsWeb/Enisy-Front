import * as authApi from '@/api/auth.js';
import { setTokens, getJWTPayload, getAccessToken, setRefTokens, cleanTokensData } from '@/utils/tokens';

let readyResolver;
let readyPromise = new Promise(function(resolve){
	readyResolver = resolve;
});

export default {
	namespaced: true,
	state: {
		user: null,
	},
	getters: {
		ready: () => readyPromise,
		isLogin: state => state.user !== null,
		checkRole: state => allowedRoles => state.user !== null && allowedRoles.some(role => state.user.roles.includes(role))
	},
	mutations: {
		setUser(state, user){
			state.user = user;
		}
	},
	actions: {
    /* problem when absent a Network */
		async autoLogin({ commit }){
			let { res } = await authApi.check();
      console.log("AUTOLOGIN", res);
			if(res){
				let { sub, roles } = getJWTPayload(getAccessToken());
				commit('setUser', { username: sub, roles });
			}

			readyResolver();
		},
		async login({ commit }, { username, password }){
			let { res, data } = await authApi.login(username, password);
			if(!res){
				return { errors: 'Network error!' }
			}
			else if(data.res){
        setRefTokens(data.refreshToken);
				setTokens(data.accessToken);
				let { sub, roles } = getJWTPayload(data.accessToken);
				commit('setUser', { username: sub, roles });
			}
			return data; 
		},

    async register(store, { username, password }) {
      let {res, data } = await authApi.register(username, password);
      if (!res) {
        return { errors: "Network error!"}
      } 
      return data;
    },

		async logout({ dispatch }){
			let { data } = await authApi.logout();
 console.warn(data)
			if(data.res){
				dispatch('clean');
			}

			return data;
		},
		clean({ commit }){
			cleanTokensData();
			commit('setUser', null);
		}
	}
}
import { createStore } from 'vuex'
import topics from "@/store/topics"
import user from "@/store/user"

import { addResponseHandler } from '@/api/server';
import router from '@/router'; // bad, tmp

const store = createStore({
	modules: {
		topics,
    user,
	},
	strict: process.env.NODE_ENV !== 'production'
});

addResponseHandler(
	function(response){
		if('errorAlert' in response.config){
			response.data = { res: true, data: response.data };
		}

		return response;
	},
	function(error){
		let config = error.response.config;
    // console.warn(`${error.response.config.url} - ${error.response.status}`, config)
		if(error.response.status == 401 && config.appSilence401 !== true){
      console.log('without problem a silence401')
			// clean user data & tokens
			store.dispatch('user/clean');
			router.push({name: 'login-route'}).then(() => { 
				// location.reload(); // options vs 33 idea
			});
			return; // ?
		}

		if('errorAlert' in config){
			// let { errorAlert } = config;

			// if(typeof errorAlert === 'string'){
			// 	errorAlert = { text: errorAlert };
			// }
			// store.dispatch('alerts/add', { 
			// 	text: 'Ошибка ответа от сервера ' + errorAlert.text,
			// 	timeout: errorAlert.timeout ?? 5000,
			// 	critical: errorAlert.critical ?? false
			// });

			return { data: { res: false, data: null }};
		}
		
		return Promise.reject(error);
	}
);

export default store;

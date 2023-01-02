import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { 
  faMagnifyingGlass, faSpinner, faEye, faAtom, faCheckCircle, faExclamationCircle, faCircleExclamation,
  faUser, faTriangleExclamation, faCaretDown, faHomeUser, faSignOut, faCaretRight, faCircleUser, faComments, faHome, faSearch, 
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faInstagram, faTwitter, faFacebook, faMagnifyingGlass, faSpinner, faEye, faAtom, 
  faCheckCircle, faExclamationCircle, faCircleExclamation, faUser, faTriangleExclamation,
  faCaretDown, faCaretRight, faHomeUser, faSignOut, faCircleUser, faHome, faSearch, faComments
);

let app = createApp(App).component('fa-icon', FontAwesomeIcon).use(store).use(router);

store.dispatch('user/autoLogin');
store.dispatch('topics/load')
app.mount('#app');

// store.dispatch('topics/load').then(() => {
// 	app.mount('#app');
// });


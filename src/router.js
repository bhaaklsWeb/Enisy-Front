import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

//views
import E404 from '@/views/MyError404';
import Topics from '@/views/TopicsPage';
import Topic from '@/views/TopicPage';
import Login from '@/views/SignIn';
import Registration from '@/views/SignUp';
import UserProfile from '@/views/UserProfile';

let routes = [
	{
		name: 'topics',
		path: '/',
		component: Topics
	},
	{
		name: 'topics-item',
		path: '/topics/:id',
		component: Topic,
		meta: { scrollToTop: true }
	},
  {
    name: 'login-route',
    path: '/login',
    component: Login,
    meta: { scrollToTop: true },
    async beforeEnter(from, to, next){
			await store.getters['user/ready'];
			store.getters['user/isLogin'] ? next({ name: 'profile-route' }) : next();
		}
  },
  {
    name: 'register-route',
    path: '/registration',
    component: Registration,
    meta: { scrollToTop: true }
  },
  {
    name: 'profile-route',
    path: '/profile',
    component: UserProfile,
    meta: { scrollToTop: true },
    async beforeEnter(from, to, next){
			await store.getters['user/ready'];
			store.getters['user/isLogin'] ? next() : next({ name: 'topics' });
		}
  },
	{
		path: '/:any(.*)',
		component: E404
	}
];

const scrollBehavior = function (to, from, savedPosition) {
	if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}

    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash

      // specify offset of the element
      if (to.hash === '#anchor2') {
        position.offset = { top: 200 };
      }
      console.log(position)
      // bypass #1number check
      if (/^#\d/.test(to.hash) || document.querySelector(to.hash)) {
        return position;
      }
      return false;
    }

    if (to.matched.some(m => m.meta.scrollToTop)) {
      return { left: 0, top: 0 };
    }
  }
}

const router = createRouter({
	history: createWebHistory(),
	scrollBehavior,
	routes,
	
});


router.beforeResolve((to, from, next) => {
  if (to.name) {
    // eslint-disable-next-line
    NProgress.start()
  }
  next()
})
// eslint-disable-next-line
router.afterEach((to, from) => {
  // eslint-disable-next-line
  NProgress.done()
})

export default router;
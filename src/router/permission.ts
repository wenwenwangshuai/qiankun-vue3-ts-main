import { Router } from 'vue-router';
import store from '@/store/index';

export default (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    if (!store.getters.userInfo) {
      await store.dispatch('user/getUserInfo');
    }
    next();
  });
};

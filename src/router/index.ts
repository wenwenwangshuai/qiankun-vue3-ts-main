import {
  RouteRecordRaw,
  createWebHashHistory,
  createRouter,
  Router
} from 'vue-router';
import routerPermission from '@/router/permission';

const routes: RouteRecordRaw[] = [];

const router: Router = createRouter({
  history: createWebHashHistory('/'),
  routes: routes
});
// 路由拦截
routerPermission(router);

export default router;

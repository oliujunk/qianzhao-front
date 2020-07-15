import Vue from 'vue';
import VueRouter from 'vue-router';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/data',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '/data',
        component: () => import('@/views/Data.vue'),
      },
      {
        path: '/user',
        component: () => import('@/views/User.vue'),
      },
      {
        path: '/useradvanced',
        component: () => import('@/views/UserAdvanced.vue'),
      },
      {
        path: '/network',
        component: () => import('@/views/Network.vue'),
      },
      {
        path: '/property',
        component: () => import('@/views/Property.vue'),
      },
      {
        path: '/element',
        component: () => import('@/views/Element.vue'),
      },
      {
        path: '/status',
        component: () => import('@/views/Status.vue'),
      },
      {
        path: '/setting/network',
        component: () => import('@/views/NetworkSetting.vue'),
      },
      {
        path: '/setting/property',
        component: () => import('@/views/PropertySetting.vue'),
      },
      {
        path: '/setting/element',
        component: () => import('@/views/ElementSetting.vue'),
      },
      {
        path: '/setting/sntp',
        component: () => import('@/views/SNTP.vue'),
      },
      {
        path: '/setting/reset',
        component: () => import('@/views/Reset.vue'),
      },
      {
        path: '/download/minute',
        component: () => import('@/views/Minute.vue'),
      },
      {
        path: '/download/second',
        component: () => import('@/views/Second.vue'),
      },
      {
        path: '/download/log',
        component: () => import('@/views/Log.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const username = sessionStorage.getItem('username');
  if (to.path === '/login') {
    if (username) {
      next({ path: '/data' });
    } else {
      next();
    }
  } else if (!username) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;

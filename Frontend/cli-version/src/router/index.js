import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
    },
    {
        path: '/connexion',
        name: 'Connexion',
        component: () => import('../views/Connexion.vue')
    },
    {
        path: '/inscription',
        name: 'Inscription',
        component: () => import('../views/Inscription.vue')
    },
    {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/Messages.vue')
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/connexion', '/inscription'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('userId');
    const loggedToken = localStorage.getItem('token');
  
    if (authRequired && !loggedIn && !loggedToken) {
      return next('/connexion');
    }
    next();
  })

export default router


import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Accueil',
        component: () => import('../components/Accueil'),
    },
    {
        path: '/connexion',
        name: 'Connexion',
        component: () => import('../components/Connexion'),
    },
    {
        path: '/inscription',
        name: 'Inscription',
        component: () => import('../components/Inscription')
    },
    {
        path: '/compte',
        name: 'compte',
        component: () => import('../components/Compte')
    },
    {
        path: '/messages',
        name: 'Messages',
        component: () => import('../components/Messages')
    },
    {
        path: '/commentaires/:id',
        name: 'Commentaires',
        component: () => import('../components/Commentaires')
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
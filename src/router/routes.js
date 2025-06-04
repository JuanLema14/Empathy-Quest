const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'inicio',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'juego',
        name: 'juego',
        component: () => import('pages/GamePage.vue'),
      },
      {
        path: 'admin-reset',
        name: 'admin-reset',
        component: () => import('pages/AdminReset.vue'),
      },
      {
        path: 'leaderboard',
        name: 'leaderboard',
        component: () => import('pages/LeaderboardPage.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

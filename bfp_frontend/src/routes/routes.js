import { lazy } from 'react';

const routes = [

  {
    path: '/home',
    component: lazy(() => import('../components/home')),
    exact: true
  },
  {
    path: '/createProject/:id',
    component: lazy(() => import('../components/createProjects')),
    exact: true
  },
  {
    path: '/projects/:id',
    component: lazy(() => import('../components/viewProject')),
    exact: true
  },

];

export default routes;
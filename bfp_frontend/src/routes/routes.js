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
  {
    path: '/projects/:id/issues',
    component: lazy(() => import('../components/viewIssues')),
    exact: true
  },
  {
    path: '/projects/:id/code',
    component: lazy(() => import('../components/codeview')),
    exact: true
  },
  {
    path: '/projects/:id/testerlog',
    component: lazy(() => import('../components/testerlog')),
    exact: true
  },
  {
    path: '/projects/:id/issues/:id2/solutions',
    component: lazy(() => import('../components/viewSolutions')),
    exact: true
  },
  {
    path: '/aboutUser',
    component: lazy(() => import('../components/aboutUser')),
    exact: true
  },

];

export default routes;
import React from 'react';
// MindMap 
const Scene = React.lazy(() => import('./pages/Scene'));
const Admin = React.lazy(() => import('./pages/admin'));
const NewModel = React.lazy(() => import('./pages/NewModel'));
const EditModel = React.lazy(() => import('./pages/EditModal'));

const routes = [
  { path: '/', element: <Scene /> },
  { path: '/admin', element: <Admin /> },
  { path: '/add', element: <NewModel /> },
  { path: '/edit/:id', element: <EditModel /> },
];

export default routes;

import MainLayout from '@layouts/MainLayout';
import AdminLayout from '@layouts/AdminLayout';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import AdminHome from '@pages/AdminHome';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  {
    path: '/admin',
    name: 'Admin Home',
    protected: true,
    component: AdminHome,
    layout: AdminLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;

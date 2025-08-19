import { Routes } from '@angular/router';
import { Navbar } from '../Components/navbar/navbar';
import { Home } from '../Components/home/home';
import { About } from '../Components/about/about';
import { Services } from '../Components/services/services';
import { Contact } from '../Components/contact/contact';
import { Error } from '../Components/error/error';
import { TotalProduct } from '../Components/total-product/total-product';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Navbar,
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: 'service',
        component: Services,
      },
      {
        path: 'contact',
        component: Contact,
      },
      {
        path: 'addCart',
        component: TotalProduct,
      },
    ],
  },
  {
    path: '**',
    component: Error,
  },
];

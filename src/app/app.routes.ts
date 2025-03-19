import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        title: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        title: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        title: 'register',
        component: RegistroComponent
    },
    {
        path: 'cart',
        title: 'cart',
        component: CartComponent
    },
    
];
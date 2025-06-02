import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { RegistroComponent } from './features/auth/components/registro/registro.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { DetalleObraComponent } from './pages/detalle-obra/detalle-obra.component';

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
    {
        path: 'perfil',
        title: 'perfil',
        component: PerfilComponent
    },
    {
        path: 'editarPerfil',
        title: 'editarPerfil',
        component: EditarPerfilComponent
    },
    {
        path: 'detalle-obra/:id',
        title: 'detalleObra',
        component: DetalleObraComponent
    }
];
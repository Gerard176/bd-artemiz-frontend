import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'frontend';
  currentRoute: string = '';
  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.currentRoute = event.urlAfterRedirects;
      }
    })
  }
   showHeader(): boolean {
    // Rutas donde quieres mostrar el header
    const rutasConHeader = ['/', '/cart', '/perfil', '/editarPerfil', '/detalle-obra'];
    // Para detalle-obra con id, solo verifica si la ruta empieza con /detalle-obra
    if (this.currentRoute.startsWith('/detalle-obra')) return true;

    return rutasConHeader.includes(this.currentRoute);
  }
}

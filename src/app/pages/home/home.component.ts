import { Component, inject } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ObrasService, Obra } from '../../core/services/obras/obras.service';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { FavoritosService } from '../../core/services/favoritos/favoritos.service';


@Component({
  selector: 'app-home',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  obras: Obra[] = [];
  loading = true;
   favoritos: string[] = [];
  error: string | null = null;
   idUsuario: string | null = null;

  constructor(
    private obrasService: ObrasService,
    private cartService: CartService,
    private favoritosService: FavoritosService
  ) {

    this.idUsuario = localStorage.getItem('userId');
    this.loadObras();
    if (this.idUsuario) this.loadFavoritos();
     
  }

  loadObras() {
    this.obrasService.getObras().subscribe({
      next: (data) => {
        
        this.obras = data;
        console.log('Cantidad de obras recibidas:', this.obras.length);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las obras';
        this.loading = false;
        console.error(err);
      }
    });
  }

  agregarAlCarrito(obra: Obra) {
  const idUsuario = localStorage.getItem('userId');
   console.log('Usuario en localStorage:', idUsuario);
  if (!idUsuario) {
    alert("Debes iniciar sesión para agregar al carrito");
    return;
  }

  const item = {
    idUsuario: idUsuario,
    idItem: obra._id
  };

  this.cartService.agregarAlCarrito(item).subscribe({
    next: (res: any) => {
      console.log("Obra agregada al carrito", res);
      alert("Obra agregada al carrito");
    },
    error: (err) => {
      console.error("Error al agregar al carrito", err);
      alert("Error al agregar al carrito");
    }
  });
}
  loadFavoritos() {
    const idUsuario = localStorage.getItem('userId');
    if (idUsuario) {
      this.favoritosService.obtenerFavoritos(idUsuario).subscribe({
        next: (res: any) => {
          this.favoritos = res.data.map((item: any) => item._id);
        },
        error: (err) => {
          console.error('Error al cargar favoritos', err);
        }
      });
    }
  }

  esFavorito(idObra: string): boolean {
    return this.favoritos.includes(idObra);
  }

  toggleFavorito(idObra: string) {
    const idUsuario = localStorage.getItem('userId');
    if (!idUsuario) {
      alert('Debes iniciar sesión para agregar a favoritos');
      return;
    }

    if (this.esFavorito(idObra)) {
      this.favoritosService.eliminarFavorito(idObra).subscribe({
        next: () => {
          this.favoritos = this.favoritos.filter(id => id !== idObra);
        },
        error: (err) => {
          console.error('Error al eliminar de favoritos', err);
        }
      });
    } else {
      this.favoritosService.agregarFavorito(idUsuario, idObra).subscribe({
        next: () => {
          this.favoritos.push(idObra);
        },
        error: (err) => {
          console.error('Error al agregar a favoritos', err);
        }
      });
    }
  }

 
}




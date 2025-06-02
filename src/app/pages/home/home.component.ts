import { Component, inject } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ObrasService, Obra } from '../../core/services/obras/obras.service';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-home',
   
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  obras: Obra[] = [];
  loading = true;
  error: string | null = null;

 constructor(private obrasService: ObrasService, private cartService: CartService) {
  console.log('CartService methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(this.cartService)));
  this.loadObras();
}

agregarAlCarrito(obra: Obra) {
  this.cartService.agregarAlCarrito(obra);
}

  loadObras() {
    this.obrasService.getObras({ limit: 20 }).subscribe({
      next: (data) => {
        this.obras = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las obras';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
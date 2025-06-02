import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Obra } from '../obras/obras.service'; 

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Obra[] = [];
  private cartSubject = new BehaviorSubject<Obra[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor() {}

  agregarAlCarrito(obra: Obra) {
    this.cartItems.push(obra);
    this.cartSubject.next(this.cartItems);
  }

  eliminarDelCarrito(id: string) {
    this.cartItems = this.cartItems.filter(item => item._id !== id);
    this.cartSubject.next(this.cartItems);
  }

  obtenerCarrito(): Obra[] {
    return [...this.cartItems];
  }

  vaciarCarrito() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }
}

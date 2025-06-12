import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carrito: Array<any> = [];
  total = 0;
  idUsuario = localStorage.getItem('userId') || '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito(): void {
    if (!this.idUsuario) return;

    this.cartService.obtenerCarrito(this.idUsuario).subscribe({
      next: (res) => {
        if (res.data?.length > 0) {
          this.carrito = res.data[0].items;
          this.recalcularTotal();
        } else {
          this.carrito = [];
          this.total = 0;
        }
      },
      error: (err) => console.error('Error al obtener carrito:', err)
    });
  }

  eliminarItem(idItem: string): void {
    if (!idItem) return;

    this.cartService.eliminarDelCarrito(idItem).subscribe({
      next: () => this.obtenerCarrito(),
      error: (err) => console.error('Error al eliminar del carrito:', err)
    });
  }

  onCantidadChange(event: Event, obraId: string): void {
  const input = event.target as HTMLInputElement;
  const cantidad = input.valueAsNumber;

  if (cantidad < 1 || !obraId) return;

  this.cartService.actualizarCantidad(obraId, cantidad).subscribe({
    next: (res) => {
      const item = this.carrito.find(i => i._id === obraId);
      if (item) {
        item.cantidad = res.item.cantidad;
        item.subtotal = res.item.subtotal;
        this.recalcularTotal();
      }
    },
    error: (err) => console.error('Error al actualizar cantidad:', err)
  });
}

recalcularTotal(): void {
  this.total = this.carrito.reduce((acc, item) => acc + item.subtotal, 0);
}


}

import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../../../../core/services/favoritos/favoritos.service';
import { CommonModule,CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  standalone: true,
   imports: [CommonModule, RouterModule],
  providers: [CurrencyPipe],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {
  favoritos: any[] = [];
  loading = true;
  error: string | null = null;
  idUsuario: string ="";

  constructor(private favoritosService: FavoritosService) {}

  ngOnInit() {
    this.cargarFavoritos()
  }

  cargarFavoritos() {
    console.log(this.idUsuario);
    this.favoritosService.obtenerFavoritos(this.idUsuario!).subscribe({
      next: (res) => {
        this.favoritos = res.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los favoritos';
        this.loading = false;
      }
    });
  }

  eliminarFavorito(idItem: string) {
    this.favoritosService.eliminarFavorito(idItem).subscribe({
      next: () => {
        this.favoritos = this.favoritos.filter(fav => fav.obra._id !== idItem);
      },
      error: () => {
        alert("Error al eliminar favorito");
      }
    });
  }
  
}

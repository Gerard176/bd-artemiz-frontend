import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObrasService } from '../../core/services/obras/obras.service';
import { CommonModule } from '@angular/common';
import { ResenasService } from '../../core/services/resenas/resenas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-obra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-obra.component.html',
  styleUrl: './detalle-obra.component.css'
})
export class DetalleObraComponent implements OnInit {
  obra: any = null;
  resenas: any[] = [];
  miResena: any = null; 

  nuevaResena = {
    contenido: '',
    valoracion: 5,
  };

  editando = false;
  contenidoEditado = '';
  valoracionEditada = 5;

  enviando = false; 
  mensaje = '';

  idUsuarioActual = localStorage.getItem('idUsuario') || '';

  constructor(
    private route: ActivatedRoute,
    private obrasService: ObrasService,
    private resenasService: ResenasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')?.trim();
    if (id) {
      this.obtenerObra(id);
      this.obtenerResenas(id);
    }
  }

  obtenerObra(id: string): void {
    this.obrasService.getObraPorId(id).subscribe({
      next: (data) => this.obra = data,
      error: (err) => console.error(err)
    });
  }

  obtenerResenas(id: string): void {
    this.resenasService.obtenerResenas(id).subscribe({
      next: (res) => {
        this.resenas = res.data;
        this.miResena = this.resenas.find(r => r.usuario._id === this.idUsuarioActual) || null;
        if (this.miResena) {
          this.contenidoEditado = this.miResena.contenido;
          this.valoracionEditada = this.miResena.valoracion;
        }
      },
      error: (err) => console.error(err)
    });
  }

 enviarResena(): void {
    const id = this.route.snapshot.paramMap.get('id')?.trim();

    if (!this.idUsuarioActual) {
      this.mensaje = 'Debes iniciar sesión para enviar una reseña.';
      return;
    }

    if (id && this.nuevaResena.contenido.trim() !== '') {
      this.enviando = true;
      this.mensaje = '';

      const resenaData = {
        contenido: this.nuevaResena.contenido.trim(),
        valoracion: this.nuevaResena.valoracion,
        idObra: id,
        idUsuario: this.idUsuarioActual,
        likes: 0
      };

      this.resenasService.crearResena(resenaData).subscribe({
        next: () => {
          this.nuevaResena = { contenido: '', valoracion: 5 };
          this.obtenerResenas(id);
          this.mensaje = '¡Reseña publicada!';
        },
        error: (err) => {
          console.error(err);
          this.mensaje = 'Ya enviaste una reseña ❌';
        },
        complete: () => this.enviando = false
      });
    } else {
      this.mensaje = 'Completa todos los campos para enviar tu reseña.';
    }
  }

  eliminarResena(): void {
    if (!this.miResena) return;

    const datos = {
      idUsuario: this.idUsuarioActual,
      idResena: this.miResena._id
    };

    this.resenasService.eliminarResena(datos).subscribe({
      next: () => {
        this.mensaje = 'Reseña eliminada ✔️';
        const id = this.route.snapshot.paramMap.get('id')?.trim();
        if (id) this.obtenerResenas(id);
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al eliminar la reseña ❌';
      }
    });
  }

  activarEdicion(): void {
    if (this.miResena) {
      this.editando = true;
      this.contenidoEditado = this.miResena.contenido;
      this.valoracionEditada = this.miResena.valoracion;
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.mensaje = '';
  }

  guardarEdicion(): void {
    if (!this.miResena) return;

    const datos = {
      idUsuario: this.idUsuarioActual,
      idResena: this.miResena._id,
      contenido: this.contenidoEditado.trim(),
      valoracion: this.valoracionEditada
    };

    if (!datos.contenido || !datos.valoracion) {
      this.mensaje = 'Debes completar todos los campos.';
      return;
    }

    this.resenasService.actualizarResena(datos).subscribe({
      next: () => {
        this.mensaje = 'Reseña actualizada ✔️';
        const id = this.route.snapshot.paramMap.get('id')?.trim();
        if (id) this.obtenerResenas(id);
        this.editando = false;
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al actualizar ❌';
      }
    });
  }
}
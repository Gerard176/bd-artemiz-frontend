import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {
  private apiUrl = 'http://localhost:5000/api/resenas';

  constructor(private http: HttpClient) {}

  // Obtener reseñas de una obra
   obtenerResenas(idObra: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idObra}`);
  }

  crearResena(resena: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/postear`, resena);
  }

  eliminarResena(datos: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar`, { body: datos });
  }

  actualizarResena(data: { idUsuario: string; idResena: string; contenido: string; valoracion: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar`, data);
  }

}

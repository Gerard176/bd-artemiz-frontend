import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/carrito';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders().set('token', token);
  }

  agregarAlCarrito(item: { idUsuario: string; idItem: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, item, {
      headers: this.getAuthHeaders()
    });
  }

  obtenerCarrito(idUsuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idUsuario}`, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarDelCarrito(idItem: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${idItem}`, {
      headers: this.getAuthHeaders()
    });
  }

 actualizarCantidad(obraId: string, cantidad: number): Observable<any> {
  const token = localStorage.getItem('authToken') || '';
  const headers = new HttpHeaders().set('token', token);
  return this.http.put(`${this.apiUrl}/updateCantidad/${obraId}`, { cantidad }, { headers });
}

}

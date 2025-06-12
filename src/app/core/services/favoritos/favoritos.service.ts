import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private apiUrl = 'http://localhost:5000/api/favoritos';

  constructor(private http: HttpClient) {}

  obtenerFavoritos(idUsuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idUsuario}`);
  }

  agregarFavorito(idUsuario: string, idItem: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/`, { idUsuario, idItem });
  }

  eliminarFavorito(idItem: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${idItem}`);
  }
  obtenerFavoritosConObras(idUsuario: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/favoritos/obras/${idUsuario}`);
}

}

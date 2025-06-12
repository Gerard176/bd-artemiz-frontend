import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

export interface Obra {
   _id: string;
  nombre: string;
  autor: string;
  descripcion: string;
  tamaño: string;
  categoria: string;
  precio: number;
  img: string;
}

@Injectable({ providedIn: 'root' })
export class ObrasService {
  private apiUrl = 'http://localhost:5000/api/obras';

  constructor(private http: HttpClient) {}

 getObras(params?: { limit?: number, skip?: number, categoria?: string, autor?: string, tamaño?: string }): Observable<Obra[]> {
  let httpParams = new HttpParams();

  if (params?.limit !== undefined) httpParams = httpParams.set('limit', params.limit.toString());
  if (params?.skip !== undefined) httpParams = httpParams.set('skip', params.skip.toString());
  if (params?.categoria) httpParams = httpParams.set('categoria', params.categoria);
  if (params?.autor) httpParams = httpParams.set('autor', params.autor);
  if (params?.tamaño) httpParams = httpParams.set('tamaño', params.tamaño);
  console.log('Enviando parámetros:', httpParams.toString());

  return this.http.get<{ data: Obra[] }>(this.apiUrl, { params: httpParams }).pipe(
  map(response => {
    console.log('Respuesta del backend:', response);
    return response.data;
  })
  );
}
   // Método para obtener obra por id 
  getObraPorId(id: string): Observable<Obra> {
    return this.http.get<Obra>(`${this.apiUrl}/${id}`);
  }
}

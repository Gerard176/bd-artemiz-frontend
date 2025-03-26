import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl + "/usuarios"
  constructor(private httpClient: HttpClient) { }

  register(nombre: String, apellido: String, nickName: String, email: String, direccion: String, telefono: Number ,password: String): Observable<any> {
    const body = { nombre, apellido, nickName, email, direccion, telefono, password }
    return this.httpClient.post(this.apiUrl + '/registro', body).pipe(
      catchError( error => {
        console.error("Error al hacer la peticion en el registro" + error)
        return throwError(() => error);
      })
    )
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
private apiUrl = environment.apiUrl + "/usuarios";
  constructor(private httpClient: HttpClient) { }

  editUser(nombre: String, apellido: String, cedula: Number, nickName: String, direccion: String, telefono: Number ): Observable<any> {
    const body = { nombre, apellido, cedula, nickName,direccion, telefono }
    return this.httpClient.put(this.apiUrl + '/'+ cedula, body).pipe(
      catchError( error => {
        console.error("Error al hacer la peticion editando el usuario" + error)
        return throwError(() => error);
      })
    )
  }
}

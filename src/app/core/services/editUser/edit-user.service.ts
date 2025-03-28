import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private apiUrl = environment.apiUrl + "/usuarios";
  constructor(private httpClient: HttpClient) { }

  editUser(nombre: string, apellido: string, id: string, nickName: string, direccion: string, telefono: Number): Observable<any> {
    const body = { nombre, apellido, id, nickName, direccion, telefono }
    console.log(body);
    return this.httpClient.put(this.apiUrl + '/' + id, body).pipe(
      catchError(error => {
        console.error("Error al hacer la peticion editando el usuario" + JSON.stringify(error))
        return throwError(() => error);
      })
    )
  }

  updateProfileImage(imageData: FormData, id: string): Observable<any> {
    const headers = new HttpHeaders().set('id', id);
    return this.httpClient.post(`${this.apiUrl}/actualizarImagenDeUsuario`, imageData, {headers: headers}).pipe(
      catchError(error => {
        console.error("Error al cambiar la imagen" + JSON.stringify(error))
        return throwError(() => error);
      })
    );
  }

}

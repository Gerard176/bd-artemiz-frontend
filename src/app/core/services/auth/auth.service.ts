import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + "/usuarios";
  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    const body = { email, password };
    console.log(this.apiUrl);
    console.log(body);
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}/login`, body)
    .pipe(
      tap(res => {
        if (res.token) {
          this.setSession(res.token);
        }
      }),
      catchError(error => {
        console.error("Error en la peticion", error);
        return throwError(() => error);
      })
    );
  }

  setSession(token: string): void{
    localStorage.setItem('authToken',token);
  }

  isLoggedIn(){

  }
}

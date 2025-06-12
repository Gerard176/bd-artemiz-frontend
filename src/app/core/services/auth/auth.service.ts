import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + "/usuarios";

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.httpClient.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        this.setSession(response.token);
        // Guardamos el ID del usuario correctamente con el nombre 'idUsuario'
        if (response.usuario && response.usuario.length > 0) {
          localStorage.setItem('idUsuario', response.usuario[0]._id);
        }
      }),
      catchError(error => {
        console.error("Error en la petición", error, body);
        return throwError(() => error);
      })
    );
  }

  getUserProfile(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('token', token || '');
    return this.httpClient.get<any>(`${this.apiUrl}/perfil`, { headers }).pipe(
      catchError(error => {
        console.log("Status:", error.status);
        if (error.status == 401) {
          this.logout();
          this.router.navigate(['/']);
        }
        return throwError(() => error);
      })
    );
  }

  setSession(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('idUsuario'); // Limpiar también el ID del usuario al cerrar sesión
  }
}

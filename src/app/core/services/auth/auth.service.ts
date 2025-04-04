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
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.httpClient.post(`${this.apiUrl}/login`, body)
      .pipe(catchError(error => {
        console.error("Error en la peticion", error, body);
        return throwError(() => error);
      })
      );
  }
  getUserProfile(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('token', token || '')
    return this.httpClient.get<any>(`${this.apiUrl}/perfil`, { headers: headers }).pipe(
      catchError(error =>{
        console.log("Status:", error.status);
        if (error.status == 401) {
          this.logout();
          this.router.navigate(['/']);
        }
        return throwError(() => error);
      }

      )
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
    // this.router.navigate(['/login']);
  }

  

}

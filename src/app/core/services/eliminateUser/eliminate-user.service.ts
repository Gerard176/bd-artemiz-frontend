import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EliminateUserService {
  private apiUrl = environment.apiUrl + "/usuarios";
  constructor(private httpClient: HttpClient) { }

  deleteUser(id: string): Observable<any>{
    return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error =>{
        return throwError(()=> error);
      })
    );
  }
}

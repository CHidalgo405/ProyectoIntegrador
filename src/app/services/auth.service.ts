import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://69.48.206.136:3000/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(error => {
        console.error('Error en la solicitud de login:', error);
        return throwError(() => new Error('Error en el login: ' + error.message));
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { name, email, password };
    return this.http.post(`${this.apiUrl}/usuarios`, body, { headers });
  }

  // Nuevo método para obtener datos del usuario por ID
  getUserData(idusuario: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.apiUrl}/usuarios/${idusuario}`, { headers }).pipe(
      tap(response => console.log('Datos del usuario:', response)),
      catchError(error => {
        console.error('Error al obtener datos del usuario:', error);
        return throwError(() => new Error('Error al obtener datos: ' + error.message));
      })
    );
  }
}
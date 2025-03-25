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

  // Método para obtener los productos
  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.apiUrl}/productos`, { headers }).pipe(
      tap(response => console.log('Productos obtenidos:', response)),
      catchError(error => {
        console.error('Error al obtener productos:', error);
        return throwError(() => new Error('Error al obtener productos: ' + error.message));
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { email, password };

    return this.http.post(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap((response: any) => {
        // Guardamos los datos del usuario en localStorage
        if (response.data) {
          localStorage.setItem('userData', JSON.stringify(response.data));
        }
      }),
      catchError(error => {
        console.error('Error en la solicitud de login:', error);
        return throwError(() => new Error('Error en el login: ' + error.message));
      })
    );
  }

  // Nuevo método para obtener datos del usuario por ID
  getUserById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.apiUrl}/usuarios/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener datos del usuario:', error);
        return throwError(() => new Error('Error al obtener usuario: ' + error.message));
      })
    );
  }

  // Método para obtener los datos del usuario desde localStorage
  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  register(name: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { name, email, password };
    return this.http.post(`${this.apiUrl}/usuarios`, body, { headers });
  }
}
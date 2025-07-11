import { inject, Injectable } from '@angular/core';
import { environment } from './environments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from './app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.api; // api: 'http://localhost:8081/api/users'
  private http = inject(HttpClient);
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  /** GET: Obtener todos los usuarios */
  getUsers(): Observable<user[]> {
    return this.http.get<user[]>(`${this.apiUrl}`, {
      headers: this.jsonHeaders
    });
  }

  /** POST: Crear un nuevo usuario */
  addUser(user: user): Observable<user> {
    return this.http.post<user>(`${this.apiUrl}/add`, user, {
      headers: this.jsonHeaders
    });
  }

  /** PUT: Actualizar un usuario existente */
  updateUser(user: user): Observable<user> {
    return this.http.put<user>(`${this.apiUrl}/update`, user, {
      headers: this.jsonHeaders
    });
  }

  /** DELETE: Eliminar un usuario por ID */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, {
      headers: this.jsonHeaders
    });
  }

  /** GET: Obtener un usuario por ID (opcional, si usas /user/{id}) */
  getUserById(id: number): Observable<user> {
    return this.http.get<user>(`${this.apiUrl}/user/${id}`, {
      headers: this.jsonHeaders
    });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../userModel/userModel';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api';  // URL de tu API PHP

  public headers = new HttpHeaders({
    'Content-Type': 'application/json',     // Ejemplo de cabecera
    'Authorization': 'Bearer tu-token',     // Ejemplo de autorización con token
    'Custom-Header': 'valor-personalizado'  // Otra cabecera personalizada
  });

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl,
       {
        headers: new HttpHeaders({
          'Authorization': 'Bearer your-token',
          'Content-Type': 'application/json'  
        })
      }
    );
  }

  // Obtener un solo usuario
  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`
      , {
        headers: new HttpHeaders({
          'Authorization': 'Bearer your-token',
          'Content-Type': 'application/json'  
        })
      }

    );
  }

   // Crear un nuevo usuario
   createUser(user: { name: string, email: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer your-token',
        'Content-Type': 'application/json'
      })
    }
  );
  }

  // Actualizar un usuario
  updateUser(id: number, user: { name: string, email: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}?id=${id}`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}?id=${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtener el token almacenado

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('authorization', token); // Incluir el token si existe
    }

    return headers;
  }
}

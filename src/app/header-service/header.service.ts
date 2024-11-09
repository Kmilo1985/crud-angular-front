import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private headers: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',       // Indica una solicitud AJAX
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',        // Tipo de contenido enviado
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',  
    'Content-Type': 'application/json',              // Tipo de contenido esperado
  });

  constructor() { }

  /**
   * Añade o actualiza una cabecera.
   * Valida que la cabecera no esté repetida.
   */
  addHeader(key: string, value: string): void {
    if (!key || !value) {
      console.warn(`Cabecera no válida. Key: ${key}, Value: ${value}`);
      return;
    }

    // Evitar duplicados, solo actualiza si la cabecera no está presente
    if (!this.headers.has(key) || this.headers.get(key) !== value) {
      this.headers = this.headers.set(key, value);
      console.log(`Cabecera añadida: ${key} = ${value}`);
    }
  }

  /**
   * Elimina una cabecera específica.
   */
  removeHeader(key: string): void {
    if (this.headers.has(key)) {
      this.headers = this.headers.delete(key);
      console.log(`Cabecera eliminada: ${key}`);
    }
  }

  /**
   * Obtiene todas las cabeceras actualmente configuradas.
   */
  getHeaders(): HttpHeaders {
    return this.headers;
  }

  /**
   * Elimina todas las cabeceras (reset).
   */
  clearHeaders(): void {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',      // Restablecer a valores por defecto
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    console.log('Todas las cabeceras han sido eliminadas y restablecidas a valores por defecto.');
  }

  /**
   * Verifica si una cabecera existe.
   */
  hasHeader(key: string): boolean {
    return this.headers.has(key);
  }
}

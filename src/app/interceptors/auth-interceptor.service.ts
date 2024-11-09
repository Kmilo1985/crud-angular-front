import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeaderService } from '../header.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private headerService: HeaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener las cabeceras desde el servicio
    const customHeaders = this.headerService.getHeaders();

    // Solo clonar la solicitud si hay cabeceras personalizadas
    const clonedRequest = req.clone({
      headers: customHeaders
    });

    return next.handle(clonedRequest);
  }
}

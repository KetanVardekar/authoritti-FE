import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorClass {
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isLoggedIn = !!localStorage.getItem('token');
    if (isLoggedIn) {
      const token = localStorage.getItem('token');

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    }
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          // do stuff with response

      }
  }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
              // redirect to the login route
              localStorage.clear();
              this.router.navigate(['/login']);
          }
      }
  }));
  }
}

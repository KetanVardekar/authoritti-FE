import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(payload: any) {
    return this.http.post(`${environment.apiUrl}/auth/login`, payload);
  }
  signUp(payload: any){
    return this.http.post(`${environment.apiUrl}/auth/signup`, payload);
  }
  forgotPassword(payload:any){
    return this.http.post(`${environment.apiUrl}/auth/forgotPassword`, payload);
  }
  updateForgotPassword(payload:any){
    return this.http.put(`${environment.apiUrl}/auth/updatepassword`, payload);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getAllApps() {
    return this.http.get(`${environment.apiUrl}/application`);
  }

  createApp(payload: any) {
    return this.http.post(`${environment.apiUrl}/application`, payload);
  }
  updateApp(payload: any, id: any) {
    return this.http.put(`${environment.apiUrl}/application/` + id, payload)
  }
  deleteAppById(id: any) {
    return this.http.delete(`${environment.apiUrl}/application/` + id);
  }
  getAppById(id: any) {
    return this.http.get(`${environment.apiUrl}/application/` + id);
  }

}

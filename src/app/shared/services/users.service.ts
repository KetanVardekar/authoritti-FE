import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  addUser(payload:any){
    return this.http.post(`${environment.apiUrl}/user`, payload);
  }
  getUsers() {
    return this.http.get(`${environment.apiUrl}/user`);
  }
  getUserById(id:any){
    return this.http.get(`${environment.apiUrl}/user/`+id );
  }
updateUser(payload:any,id :any){
  return this.http.put(`${environment.apiUrl}/user/`+id,payload);
}
deleteUser(id:any){
  return this.http.delete(`${environment.apiUrl}/user/`+ id);
}

}

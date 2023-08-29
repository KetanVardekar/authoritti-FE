import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadCalculatorService {

  appObj:any = {};
  constructor(private http: HttpClient) { }

  storeAppObj(key:any,value:any){
      this.appObj[key] = value;
  }

  storeFullObj(obj:any){
    this.appObj = obj;
    return this.appObj;
  }

  resetObj(){
    this.appObj = {};
  }

  getLeadCalculatorList() {
    return this.http.get(`${environment.apiUrl}/leadCalculator`);
  }

  getLeadById(id:any){
    return this.http.get(`${environment.apiUrl}/leadCalculator/` + id);
  }

  createLead(payload:any){
    return this.http.post(`${environment.apiUrl}/leadCalculator`,payload);
  }

  updateLead(id:any,payload:any){
    return this.http.put(`${environment.apiUrl}/leadCalculator/` + id,payload);
  }

  deleteLead(id:any){
    return this.http.delete(`${environment.apiUrl}/leadCalculator/` + id);
  }

  checkUniqueName(payload:any){
    return this.http.post(`${environment.apiUrl}/leadCalculator/uniqueName`, payload)
  }

}

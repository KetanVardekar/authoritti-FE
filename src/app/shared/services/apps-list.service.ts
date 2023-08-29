import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppListService {

  constructor(private http: HttpClient) { }

  getAppList() {
    return this.http.get(`${environment.apiUrl}/application/getAppByName`);
  }
  getDataByCategoryId(appId: any, categoryId: any) {
    return this.http.get(`${environment.apiUrl}/application/` + appId + '/categories/' + categoryId);
  }
  getDataByGroupyId(appId: any, groupId: any) {
    return this.http.get(`${environment.apiUrl}/application/` + appId + '/group/' + groupId);
  }
  getPageById(appId: any, typeId: any) {
    return this.http.get(`${environment.apiUrl}/application/` + appId + '/page/' + typeId);
  }
  getcategoriesByApplicationId(appId: any) {
    return this.http.get(`${environment.apiUrl}/application/` + appId + '/categories');
  }
  getGroupsByApplicationId(appId: any) {
    return this.http.get(`${environment.apiUrl}/application/` + appId + '/group');
  }
  addCategory(id: any, payload: any) {
    return this.http.post(`${environment.apiUrl}/application/` + id + '/categories', payload);
  }
  addGroup(id: any, payload: any) {
    return this.http.post(`${environment.apiUrl}/application/` + id + '/group', payload);
  }
  updateCategory(appId: any, id: any, payload: any) {
    return this.http.put(`${environment.apiUrl}/application/categories/` + id, payload)
  }
  updateGroup(appId: any, id: any, payload: any) {
    return this.http.put(`${environment.apiUrl}/application/group/` +   id, payload)
  }
  addPagesType(appId: any, payload: any) {
    return this.http.put(`${environment.apiUrl}/application/` + appId + '/page', payload)
  }
  editPagesType(appId: any, pageId: any, payload: any) {
    return this.http.put(`${environment.apiUrl}/application/` + appId + '/page/' + pageId, payload)
  }
  deletePage(appId: any, pageId: any) {
    return this.http.delete(`${environment.apiUrl}/application/` + appId + '/page/' + pageId)
  }
  deleteCategory(appId: any, id: any) {
    return this.http.delete(`${environment.apiUrl}/application/` + appId + '/categories/' + id)
  }
  deleteGroup(appId: any, id: any) {
    return this.http.delete(`${environment.apiUrl}/application/` + appId + '/group/' + id)
  }
  addQuestions(appId: any, id: any, payload: any) {
    return this.http.put(`${environment.apiUrl}/application/` + appId + '/addQuestion/' + id, payload)
  }
  getReportData(appId:any) {
    return this.http.get(`${environment.apiUrl}/report/application/`+ appId);
  }
  getReportById(reportId: any) {
    return this.http.get(`${environment.apiUrl}/report/` + reportId);
  }
  deleteReport(reportId: any){
    return this.http.delete(`${environment.apiUrl}/report/` + reportId )
  }
  getQuestionById(appId: any, questionId: any) {
    return this.http.get(`${environment.apiUrl}/application/` + appId + '/question/' + questionId);
  }
  updateQuestion(questionId: any, payload: any) {
    return this.http.put(`${environment.apiUrl}/application/updateQuestion/` + questionId, payload)
  }

  deleteQuestion(appId: any, pageId: any, questionId: any) {
    return this.http.delete(`${environment.apiUrl}/application/` + appId + '/' + pageId + '/deleteQuestion/' + questionId)
  }
  addTemplate(appId: any, pageId: any, payload: any) {
    return this.http.put(`${environment.apiUrl}/application/` + appId + '/addTemplate/' + pageId, payload)
  }
  updateTemplate(templateId: any, payload: any) {
    return this.http.put(`${environment.apiUrl}/application/updateTemplate/` + templateId, payload)
  }
  getTemplateById(appId: any, templateId: any) {
    return this.http.get(`${environment.apiUrl}/application/` + appId + '/template/' + templateId);
  }
  deleteTemplateById(appId: any, pageId: any, templateId: any) {
    return this.http.delete(`${environment.apiUrl}/application/` + appId + '/' + pageId + '/deleteTemplate/' + templateId)
  }
  addCategoryData(appId: any,payload :any){
    return this.http.post(`${environment.apiUrl}/application/` + appId + '/categories', payload);
  }
  addGroupData(appId: any,payload :any){
    return this.http.post(`${environment.apiUrl}/application/` + appId + '/group', payload);
  }
  addReport(payload :any){
    return this.http.post(`${environment.apiUrl}/report` , payload)
  }
  updateReport(reportId:any,payload:any){
    return this.http.put(`${environment.apiUrl}/report/` + reportId, payload)

  }
  checkUniqueName(appId:any,payload:any){
    return this.http.post(`${environment.apiUrl}/report/application/` + appId , payload)
  }

}

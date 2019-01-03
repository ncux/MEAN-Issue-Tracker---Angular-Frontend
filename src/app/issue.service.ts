import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {


  server_url = 'http://127.0.0.1:3000/issues';


  constructor(private http: HttpClient) { }


  getAllIssues() {
    return this.http.get(this.server_url);
  }


  getOneIssue(id) {
    return this.http.get(`${this.server_url}/${id}`);
  }


  addAnIssue(title, responsible, description, severity) {
    const issue = {title: title, responsible: responsible, description: description, severity: severity};
    return this.http.post(`${this.server_url}/add`, issue);
  }


  updateAnIssue(id, title, responsible, description, severity, status) {
    const issue = {title: title, responsible: responsible, description: description, severity: severity, status: status};
    return this.http.put(`${this.server_url}/update/${id}`, issue);
  }


  deleteAnIssue(id) {
    return this.http.delete(`${this.server_url}/delete/${id}`);
  }


}

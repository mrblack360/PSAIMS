import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'proxy-config.json';

@Injectable({
  providedIn: 'root',
})
export class DashboardsService {
  baseUrl = config['/api'].target;
  constructor(public http: HttpClient) {}

  public getAllEnrolledStudents(): Observable<any> {
    return this.http.get(this.baseUrl + '/dashboards/students');
  }
  public getAllEmployedTeachers(): Observable<any> {
    return this.http.get(this.baseUrl + '/dashboards/teachers');
  }
}

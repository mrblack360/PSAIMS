import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardsService {
  constructor(public http: HttpClient) {}

  public getAllEnrolledStudents(): Observable<any> {
    return this.http.get('http://localhost:3000/dashboards/students');
  }
  public getAllEmployedTeachers(): Observable<any> {
    return this.http.get('http://localhost:3000/dashboards/teachers');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'proxy-config.json';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl = config['/api'].target;
  constructor(private _http: HttpClient) {}
  getStudents(): Observable<any> {
    return this._http.get(this.baseUrl + '/students');
  }
  addStudent(student: any): Observable<any> {
    return this._http.post(this.baseUrl + '/student', student);
  }
  editStudent(student: any): Observable<any> {
    return this._http.put(this.baseUrl + '/student/' + student.id, student);
  }
  deleteStudent(id: number): Observable<any> {
    return this._http.delete(this.baseUrl + '/student/' + id);
  }
}

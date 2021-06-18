import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'proxy-config.json';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  baseUrl = config['/api'].target;
  constructor(private _http: HttpClient) {}
  getTeachers(): Observable<any> {
    return this._http.get(this.baseUrl + '/teachers');
  }
  addTeacher(teacher: any): Observable<any> {
    return this._http.post(this.baseUrl + '/teacher', teacher);
  }
  editTeacher(teacher: any): Observable<any> {
    return this._http.put(
      this.baseUrl + '/teacher/' + teacher.userName,
      teacher
    );
  }
  deleteTeacher(username: string): Observable<any> {
    return this._http.delete(this.baseUrl + '/teacher/' + username);
  }
}

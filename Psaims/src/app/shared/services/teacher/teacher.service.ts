import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private _http: HttpClient) {}
  getTeachers(): Observable<any> {
    return this._http.get('http://localhost:3000/teachers');
  }
  addTeacher(teacher: any): Observable<any> {
    return this._http.post('http://localhost:3000/teacher', teacher);
  }
  editTeacher(teacher: any): Observable<any> {
    return this._http.put(
      'http://localhost:3000/teacher/' + teacher.userName,
      teacher
    );
  }
  deleteTeacher(username: string): Observable<any> {
    return this._http.delete('http://localhost:3000/teacher/' + username);
  }
}

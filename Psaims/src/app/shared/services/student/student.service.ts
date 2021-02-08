import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}
  getStudents(): Observable<any> {
    return this._http.get('http://localhost:3000/students');
  }
  addStudent(student: any): Observable<any> {
    return this._http.post('http://localhost:3000/student', student);
  }
  editStudent(student: any): Observable<any> {
    return this._http.put(
      'http://localhost:3000/student/' + student.id,
      student
    );
  }
  deleteStudent(id: number): Observable<any> {
    return this._http.delete('http://localhost:3000/student/' + id);
  }
}

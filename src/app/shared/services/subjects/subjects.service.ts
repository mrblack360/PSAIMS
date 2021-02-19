import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(private _http: HttpClient) {}
  getSubjects(): Observable<any> {
    return this._http.get('http://localhost:3000/subjects');
  }
  addSubject(subject: any): Observable<any> {
    return this._http.post('http://localhost:3000/subject', subject);
  }
  editSubject(subject: any): Observable<any> {
    return this._http.put(
      'http://localhost:3000/subject/' + subject.id,
      subject
    );
  }
  deleteSubject(id: number): Observable<any> {
    return this._http.delete('http://localhost:3000/subject/' + id);
  }
}

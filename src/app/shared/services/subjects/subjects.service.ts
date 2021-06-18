import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'proxy-config.json';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  baseUrl = config['/api'].target;
  constructor(private _http: HttpClient) {}
  getSubjects(): Observable<any> {
    return this._http.get(this.baseUrl + '/subjects');
  }
  addSubject(subject: any): Observable<any> {
    return this._http.post(this.baseUrl + '/subject', subject);
  }
  editSubject(subject: any): Observable<any> {
    return this._http.put(this.baseUrl + '/subject/' + subject.id, subject);
  }
  deleteSubject(id: number): Observable<any> {
    return this._http.delete(this.baseUrl + '/subject/' + id);
  }
}

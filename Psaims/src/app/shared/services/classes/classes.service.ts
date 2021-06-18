import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'proxy-config.json';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  baseUrl = config['/api'].target;
  constructor(public http: HttpClient) {}

  getClasses(): Observable<any> {
    return this.http.get(this.baseUrl + '/classes');
  }
  addClass(_class: any): Observable<any> {
    return this.http.post(this.baseUrl + '/class', _class);
  }
  editClass(_class: any): Observable<any> {
    return this.http.put(this.baseUrl + '/class/' + _class.id, _class);
  }
  deleteClass(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/class/' + id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(public http: HttpClient) {}

  getClasses(): Observable<any> {
    return this.http.get('http://localhost:3000/classes');
  }
  addClass(_class: any): Observable<any> {
    return this.http.post('http://localhost:3000/class', _class);
  }
  editClass(_class: any): Observable<any> {
    return this.http.put('http://localhost:3000/class/' + _class.id, _class);
  }
  deleteClass(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/class/' + id);
  }
}

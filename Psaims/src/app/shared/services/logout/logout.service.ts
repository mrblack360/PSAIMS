import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private _http: HttpClient) {}
  logout(): Observable<any> {
    return this._http.get('http://localhost:3000/logout');
  }
}

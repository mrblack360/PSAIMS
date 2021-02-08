import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
    return this._http.post('http://localhost:3000/login', {
      username: username,
      password: password,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'proxy-config.json';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = config['/api'].target;
  constructor(private _http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
    return this._http.post(this.baseUrl + '/login', {
      username: username,
      password: password,
    });
  }
}

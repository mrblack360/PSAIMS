import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'proxy-config.json';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  baseUrl = config['/api'].target;
  constructor(private _http: HttpClient) {}
  logout(): Observable<any> {
    return this._http.get(this.baseUrl + '/logout');
  }
}

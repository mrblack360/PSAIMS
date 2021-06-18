import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'proxy-config.json';

@Injectable({
  providedIn: 'root',
})
export class AssessmentsService {
  baseUrl = config['/api'].target;
  constructor(public http: HttpClient) {}

  getAssessments(): Observable<any> {
    return this.http.get(this.baseUrl + '/assessments');
  }
  addAssessment(assessment: any): Observable<any> {
    return this.http.post(this.baseUrl + 'assessment', assessment);
  }
  editAssessment(assessment: any): Observable<any> {
    return this.http.put(
      this.baseUrl + '/assessment/' + assessment.id,
      assessment
    );
  }
  deleteAssessment(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/assessment/' + id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'proxy-config.json';

@Injectable({
  providedIn: 'root',
})
export class AssessmentMarksService {
  baseUrl = config['/api'].target;
  constructor(public http: HttpClient) {}

  getAssessmentMarks(assessmentId: number): Observable<any> {
    return this.http.get(this.baseUrl + '/assessmentMarks/' + assessmentId);
  }
  updateAssessmentMarks(marks: {
    student: number;
    assessment: number;
    marks: number;
  }): Observable<any> {
    return this.http.put(this.baseUrl + '/assessmentMark', marks);
  }
}

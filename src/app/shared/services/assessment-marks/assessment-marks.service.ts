import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssessmentMarksService {
  constructor(public http: HttpClient) {}

  getAssessmentMarks(assessmentId: number): Observable<any> {
    return this.http.get(
      'http://localhost:3000/assessmentMarks/' + assessmentId
    );
  }
  updateAssessmentMarks(marks: {
    student: number;
    assessment: number;
    marks: number;
  }): Observable<any> {
    return this.http.put('http://localhost:3000/assessmentMark', marks);
  }
}

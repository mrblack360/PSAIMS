import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssessmentsService {
  constructor(public http: HttpClient) {}

  getAssessments(): Observable<any> {
    return this.http.get('http://localhost:3000/assessments');
  }
  addAssessment(assessment: any): Observable<any> {
    return this.http.post('http://localhost:3000/assessment', assessment);
  }
  editAssessment(assessment: any): Observable<any> {
    return this.http.put(
      'http://localhost:3000/assessment/' + assessment.id,
      assessment
    );
  }
  deleteAssessment(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/assessment/' + id);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tabs = [
    { name: 'Dashboard', permission: 3, link: 'dashboard' },
    { name: 'Students', permission: 3, link: 'students' },
    { name: 'Teachers', permission: 2, link: 'teachers' },
    { name: 'Classes', permission: 2, link: 'classes' },
    { name: 'Subjects', permission: 2, link: 'subjects' },
    { name: 'Assessments', permission: 1, link: 'assessments' },
    { name: 'Reports', permission: 1, link: 'reports' },
  ];
  constructor() {}

  ngOnInit(): void {}
}

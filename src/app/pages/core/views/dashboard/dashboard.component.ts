import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  chart: any;
  doughnut: any;
  pie: any;
  constructor() {}

  ngOnInit(): void {
    this.chart = new Chart('students_per_class', {
      type: 'bar',
      options: {
        responsive: true,
        title: { display: true, text: 'Students In each Class' },
        legend: {
          display: true,
        },
      },
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
          {
            type: 'bar',
            label: 'Students',
            data: [123, 123, 23, 453, 12, 90, 200, 150],
            backgroundColor: 'rgba(150,204,37,1)',
            borderColor: 'rgba(255,0,255,0.5)',
          },
        ],
      },
    });
    this.doughnut = new Chart('students_performance', {
      type: 'doughnut',
      options: {
        responsive: true,
        title: { display: true, text: 'Students Perfomance' },
      },
      data: {
        datasets: [
          {
            data: [45, 10, 5, 25, 15],
            backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
            label: 'Students Performance',
          },
        ],
        labels: ['A', 'B', 'C', 'D', 'E'],
      },
    });
    this.pie = new Chart('teachers_performance', {
      type: 'doughnut',
      options: {
        responsive: true,
        title: { display: true, text: 'Teachers Perfomance' },
      },
      data: {
        datasets: [
          {
            data: [45, 10, 5, 25, 15],
            backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
            label: 'Students Performance',
          },
        ],
        labels: ['Shangwe', 'Chris', 'Marlon', 'Mawazo', 'Lwanga'],
      },
    });
    this.pie = new Chart('teacher_per_subject', {
      type: 'pie',
      options: {
        responsive: true,
        title: { display: true, text: "Teachers' distribution per subject" },
      },
      data: {
        datasets: [
          {
            data: [45, 10, 5, 25, 15],
            backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue'],
            label: "Teachers' distribution",
          },
        ],
        labels: ['Chemistry', 'Physics', 'Mathematics', 'Azim', 'Angelo'],
      },
    });
  }
}

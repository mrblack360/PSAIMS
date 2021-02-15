import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/shared/services/logout/logout.service';
import { user } from '../../../../shared/global-variable';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: { username?: string; role?: string };
  tabs = [
    { name: 'Dashboard', permission: 3, link: 'dashboard' },
    { name: 'Students', permission: 3, link: 'students' },
    { name: 'Teachers', permission: 2, link: 'teachers' },
    { name: 'Classes', permission: 2, link: 'classes' },
    { name: 'Subjects', permission: 2, link: 'subjects' },
    { name: 'Assessments', permission: 1, link: 'assessments' },
    { name: 'Reports', permission: 1, link: 'reports' },
  ];
  constructor(private _router: Router, public logoutService: LogoutService) {
    this.user = {};
  }

  ngOnInit(): void {
    if (user.role.length === 0 || user.username.length == 0) {
      this._router.navigate(['/login']);
    }
    this.user = user;
  }

  ngOnChanges() {
    this.user = user;
  }
  logout() {
    this.logoutService.logout().subscribe(
      (data) => {
        this._router.navigate(['login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

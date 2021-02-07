import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  constructor(
    public router: Router,
    public loginService: LoginService,
    public snackBar: MatSnackBar
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {}

  login() {
    // this.loginService.login(this.username, this.password).subscribe(
    //   (data) => {
    //     this.snackBar.open('Successfully Loged in as ' + data.username, 'OK', {
    //       duration: 3000,
    //       horizontalPosition: 'center',
    //     });
    this.router.navigate(['../home']);
    //   },
    //   (err) => {
    //     this.snackBar.open('Ooooops! Something is not right!', 'OK', {
    //       duration: 3000,
    //       horizontalPosition: 'center',
    //     });
    //     throw err;
    //   }
    // );
  }
}

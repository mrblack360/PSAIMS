import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  email = '';
  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {}
  onNextClick() {
    this._snackBar.open(
      'An email with your credentials was sent to ' + this.email,
      'OK',
      { duration: 2000, horizontalPosition: 'left' }
    );
    this.delay(2000);
    this.router.navigate(['']);
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

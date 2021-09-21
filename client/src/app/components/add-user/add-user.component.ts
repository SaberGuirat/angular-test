import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  errMess: string;
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService
  ) {}

  getErrorMessage() {
    if (
      this.email.hasError('required') ||
      this.firstName.hasError('required') ||
      this.lastName.hasError('required')
    ) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  close(): void {
    this.dialogRef.close();
  }

  addUser() {
    this.userService
      .addUser({
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
      })
      .subscribe(
        (newUser: User) => this.dialogRef.close(newUser),
        (err) => {
          this.errMess = err;
          setTimeout(() => {
            this.errMess = '';
          }, 3000);
        }
      );
  }
}

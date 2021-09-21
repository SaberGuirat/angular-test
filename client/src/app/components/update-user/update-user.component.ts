import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent {
  email = new FormControl(this.user.email, [
    Validators.required,
    Validators.email,
  ]);
  firstName = new FormControl(this.user.firstName, [Validators.required]);
  lastName = new FormControl(this.user.lastName, [Validators.required]);
  errMess: string;
  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
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

  updateUser() {
    this.userService
      .updateUser({
        _id: this.user._id,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
      })
      .subscribe(
        (updatedUser: User) => this.dialogRef.close(updatedUser),
        (err) => {
          this.errMess = err;
          setTimeout(() => {
            this.errMess = '';
          }, 3000);
        }
      );
  }
}

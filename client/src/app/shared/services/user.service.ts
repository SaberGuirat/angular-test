import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.BASE_URL}/api/users/all`)
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(`${environment.BASE_URL}/api/users/add`, user)
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(`${environment.BASE_URL}/api/users/${user._id}`, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  deleteUser(id: string): Observable<User> {
    return this.http
      .delete<User>(`${environment.BASE_URL}/api/users/${id}`)
      .pipe(catchError(this.errorHandlerService.handleError));
  }
}

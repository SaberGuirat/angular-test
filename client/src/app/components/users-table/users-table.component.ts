import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'First Name',
    'Last Name',
    'Email',
    'Actions',
  ];
  dataSource: MatTableDataSource<User>;
  users: User[];
  errMess: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => (this.errMess = err)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openUpdateDialog(user: User) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((updatedUser: User) => {
      this.dataSource.data.forEach((user) => {
        if (user._id === updatedUser._id) {
          user.firstName = updatedUser.firstName;
          user.lastName = updatedUser.lastName;
          user.email = updatedUser.email;
        }
      });
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe((newUser: User) => {
      this.dataSource.data.push(newUser);
      this.dataSource._updateChangeSubscription();
    });
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      (deletedUser) =>
        (this.dataSource.data = this.dataSource.data.filter(
          (user) => user._id !== deletedUser._id
        )),
      (err) => (this.errMess = err)
    );
  }
}

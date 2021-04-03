import { Component, OnInit } from '@angular/core';
import { AccountType } from 'src/app/enum/account-type.enum';
import { Status } from 'src/app/enum/status.enum';
import { ApiResponse } from 'src/app/models/api-response.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { List } from 'src/app/types/list.type';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css'],
})
export class BusinessesComponent implements OnInit {
  users: List<User>;
  currentPage: number = 0;
  totalPages: number = 0;
  constructor(
    private dialogHandler: DialogHandlerService,
    private authService: AuthenticationService
  ) {}

  private getUsers(page: number) {
    this.currentPage = page;
    this.authService
      .getUsersByAccountType(page, AccountType.BUSINESS)
      .subscribe(
        (response: ApiResponse) => {
          if (response.success) {
            this.users = response.payload['content'];
            this.totalPages = response.payload['totalPages'];
          }
          console.log(this.users);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteUser(user: User) {
    this.dialogHandler.requestConfirmation(
      'Delete User',
      'Are you sure you want to delete user ' + user.name + '?',
      (yes) => {
        if (yes) {
          this.authService.deleteUserById(user.id).subscribe(
            (response: ApiResponse) => {
              if (response.success) this.getUsers(this.currentPage);
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }

  activate(e, user: User) {
    var status = Status.AC;
    if (e.target.checked) status = Status.AC;
    else status = Status.IA;

    this.authService.updateUserStatus(status, user.id).subscribe(
      (response: ApiResponse) => {
        if (!response.success) e.target.checked = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changePage(self, page) {
    self.currentPage = page;
    self.getUsers(self.currentPage);
  }
  nextPage(self) {
    if (self.currentPage <self.totalPages) {
      self.currentPage = self.currentPage + 1;
      self.getUsers(self.currentPage);
    }
  }
  previousPage(self) {
    if (self.currentPage > 0) {
      self.currentPage = self.currentPage - 1;
      self.getUsers(self.currentPage);
    }
  }
  
  ngOnInit(): void {
    this.getUsers(0);
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private dialogHandler: DialogHandlerService,
    private notification: NotificationService
  ) {}

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    return this.authService.authenticatedUser as User;
  }

  logout() {
    this.authService.logout();
  }

  editProfile() {
    this.dialogHandler.requestEditProfileDialog('Edit Profile', (response) => {
      console.log(response);
    });
  }

  ngOnInit(): void {}
}

import { AccountType } from './../../enum/account-type.enum';
import { LoginResponse } from './../../models/login-response.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppCluster } from 'src/app/app.shared.cluster';
import { Store } from 'src/app/enum/store.enum';
import { ApiResponse } from 'src/app/models/api-response.model';
import { UserRequest } from 'src/app/models/user-request.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormValidator } from 'src/app/validators/form-custom.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormValidator;
  app: AppCluster;
  userRequest = new UserRequest();

  constructor(
    private router: Router,
    private storage: StorageService,
    private authService: AuthenticationService,
    private notification: NotificationService
  ) {
    this.form = new FormValidator(UserRequest, 'form');
  }

  async getUser() {
    var userData = this.storage.get(Store.USER);
    if (userData != null) {
      var user = JSON.parse(userData);
      this.userRequest.username = user.mobile;
    }
  }

  async signIn() {
    this.form.revalidate();
    let response = this.form.response;
    this.userRequest = this.form.data;

    if (response['username'].ok && response['password'].ok) {
      this.authService.signIn(this.userRequest).subscribe(
        (response: ApiResponse) => {
          if (response.success) {
            console.log(response.payload);
            var loginResponse = response.payload as LoginResponse;
            console.log(loginResponse.user.accountType);
            if (loginResponse.user.accountType != AccountType.INDIVIDUAL) {
              this.storage.save(Store.TOKEN, loginResponse.bearer);
              this.storage.save(Store.USER, JSON.stringify(loginResponse.user));
              location.href = '/';
            } else {
              this.notification.notifyWarning("Oops. This is not a Business account!");
            }
          } else {
            this.notification.notifyError(response.message);
          }
        },
        (err) => {
          this.notification.notifyError(err);
        }
      );
    } else {
      this.notification.notifyWarning('Oops! form not filled correctly');
    }
  }

  ngOnInit(): void {
    this.getUser();
  }
}

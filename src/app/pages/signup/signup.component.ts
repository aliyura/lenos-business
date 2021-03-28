import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppCluster } from 'src/app/app.shared.cluster';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Store } from 'src/app/enum/store.enum';
import { ApiResponse } from 'src/app/models/api-response.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormValidator } from 'src/app/validators/form-custom.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormValidator;
  user: User;

  constructor(
    private app: AppCluster,
    private router: Router,
    private storage: StorageService,
    private authService: AuthenticationService,
    private notification: NotificationService
  ) {
    this.form = new FormValidator(User, 'form');
  }

  async signUp() {
    this.form.revalidate();
    let response = this.form.response;
    this.user = this.form.data;

    if (
      response['name'].ok &&
      response['email'].ok &&
      response['mobile'].ok &&
      response['country'].ok &&
      response['city'].ok &&
      response['gender'].ok &&
      response['password'].ok &&
      response['confirmPassword'].ok
    ) {
      if (this.user.password != this.user.confirmPassword) {
        this.notification.notifyWarning('Password & Confirm Password Mismatch');
      } else if (!this.app.validEmail(this.user.email)) {
        this.notification.notifyWarning('Invalid Email Address');
      } else if (!this.app.validMobile(this.user.mobile)) {
        this.notification.notifyWarning('Invalid Mobile Number');
      } else {
        delete this.user.confirmPassword;
        //format mobile number
        if (!this.user.mobile.startsWith('+234')) {
          if (this.user.mobile.startsWith('0'))
            this.user.mobile = this.user.mobile.replace(/^0/, '+234');
          else this.user.mobile = '+234' + this.user.mobile;
        }

        console.log(this.user)

        this.authService.signUp(this.user).subscribe(
          (response: ApiResponse) => {
            if (response.success) {
              this.storage.save(Store.USER, JSON.stringify(response.payload));
              this.router.navigate(['/verify-account']);
            } else {
              this.notification.notifyError(response.message);
            }
          },
          (err) => {
            console.log(err);
            this.notification.notifyError('Unable to create your Account!');
          }
        );

      }
    } else {
      this.notification.notifyWarning('Oops! Form not filled correctly');
    }
  }

  ngOnInit(): void {}
}

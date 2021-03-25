import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '../enum/store.enum';
import { ApiResponse } from '../models/api-response.model';
import { UserRequest } from '../models/user-request.model';
import { UserVerificationRequest } from '../models/user-verification-request.model';
import { User } from '../models/user.model';
import { AppService } from './app.service';
import { ProgressDialogService } from './progress-dialog.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private app: AppService,
    private http: HttpClient,
    private store: StorageService,
    private progressDialog: ProgressDialogService
  ) {}

  get authenticatedUser() {
    var appUser: User;
    var user = this.store.get(Store.USER);
    if (user != null) appUser = JSON.parse(user) as User;
    return appUser;
  }

  get isAuthenticated() {
    return !!this.store.get(Store.TOKEN);
  }
  
  get getBearerToken() {
    var bearer = this.store.get(Store.TOKEN);
    return bearer;
  }

  public signUp(user:User) {
    this.progressDialog.show("Please Wait..");
    return this.http.post(this.app.endPoint+ '/api/user/signup', user, this.app.httpHeader).pipe(
      map((response: ApiResponse) => {
        this.progressDialog.hide()
        return response;
      }),
      catchError((error) => {
        this.progressDialog.hide();
        let errorMessage = error.message !== undefined ? error.message : error.statusText;
        console.log(errorMessage)
        return throwError("Something Went Wrong");

      }))
  }
  public signIn(userRequest:UserRequest) {
    this.progressDialog.show("Please Wait..");
    return this.http.post(this.app.endPoint+ '/api/user/signin', userRequest, this.app.httpHeader).pipe(
      map((response: ApiResponse) => {
        this.progressDialog.hide()
        return response;
      }),
      catchError((error) => {
        this.progressDialog.hide();
        let errorMessage = error.message !== undefined ? error.message : error.statusText;
        console.log(errorMessage)
        return throwError("Something Went Wrong");

      }))
  }

  public verifyAccount(request:UserVerificationRequest) {
    this.progressDialog.show("Verifying..");
    return this.http.post(this.app.endPoint+ '/api/user/verify', request, this.app.httpHeader).pipe(
      map((response: ApiResponse) => {
        this.progressDialog.hide()
        return response;
      }),
      catchError((error) => {
        this.progressDialog.hide();
        let errorMessage = error.message !== undefined ? error.message : error.statusText;
        console.log(errorMessage)
        return throwError("Something Went Wrong");

      }))
  }


  public sendOTP(request:UserRequest) {
    this.progressDialog.show("Please Wait..");
    return this.http.post(this.app.endPoint+ '/api/user/generate/otp', request, this.app.httpHeader).pipe(
      map((response: ApiResponse) => {
        this.progressDialog.hide()
        return response;
      }),
      catchError((error) => {
        this.progressDialog.hide();
        let errorMessage = error.message !== undefined ? error.message : error.statusText;
        console.log(errorMessage)
        return throwError("Something Went Wrong");

      }))
  }

}

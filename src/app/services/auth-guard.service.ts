import { AccountType } from './../enum/account-type.enum';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}
  canActivate(): boolean {
    var accounType = this.authService.authenticatedUser.accountType;
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    if (accounType == AccountType.ADMIN || accounType == AccountType.BUSINESS) 
      return true;
    else
      return false;
  }
}

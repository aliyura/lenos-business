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
    var currentUser = this.authService.authenticatedUser;
    if (currentUser != null) {
      var accountType = currentUser.accountType;
      if (!this.authService.isAuthenticated) {
        this.router.navigate(['/login']);
        return false;
      }
      if (
        accountType == AccountType.ADMIN ||
        accountType == AccountType.BUSINESS
      )
        return true;
      else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

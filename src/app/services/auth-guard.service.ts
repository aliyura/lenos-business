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
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['business/login']);
      return false;
    }
    return true;
  }
}

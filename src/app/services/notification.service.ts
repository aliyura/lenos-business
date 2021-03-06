import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NotificationType } from '../enum/notification-type.enum';
import { NotificationMessage } from '../models/notification-message';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  public showNotification(message: NotificationMessage) {
    this.snackBar.open(message.message, 'x', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [
        message.type == NotificationType.error
          ? 'red-snackbar'
          : message.type == NotificationType.success
          ? 'green-snackbar'
          : 'yellow-snackbar',
      ],
    });
  }

  public notifySuccess(message: string) {
    this.showNotification({
      type: NotificationType.success,
      message: message,
    });
  }

  public notifyWarning(message: string) {
    this.showNotification({
      type: NotificationType.warning,
      message: message,
    });
  }
  public notifyError(message: string) {
    this.showNotification({
      type: NotificationType.error,
      message: message,
    });
  }

  public showFailure(message: string, redirect: string, redirectName: string) {
    location.href =
      '/transaction/status/0?message=' +
      message +
      '&redirect=' +
      redirect +
      '&name=' +
      redirectName;
  }
  public showSuccess(message: string, redirect: string, redirectName: string) {
    location.href =
      '/transaction/status/1?message=' +
      message +
      '&redirect=' +
      redirect +
      '&name=' +
      redirectName;
  }
}

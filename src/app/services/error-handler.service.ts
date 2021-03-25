import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from "@angular/material/dialog";
import { WarningModalAlert } from '../components/dialogs/warning-modal.alert';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  modalSize = 320
  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) {
    if (window.screen.width < 600)
      this.modalSize = 300
    else
      this.modalSize = window.screen.width /2.5
  }

  handleError(error) {
    console.error(error);
    this.snackbar.open(error, 'close', { duration: 10000 });
  }
  displayWarning(title: string, body: string) {
    this.dialog.open(WarningModalAlert, {
      width: this.modalSize + 'px',
      data: {
        title: title,
        body: body
      },
      // disableClose: true,
      
    });
  }
}

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-model',
  templateUrl: './loader-model.alert.html',
  styleUrls: ['./loader-model.alert.css']
})
export class LoaderModelAlert implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoaderModelAlert>) {
  }

  closeDialog() {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}

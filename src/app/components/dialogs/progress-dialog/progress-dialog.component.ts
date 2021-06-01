import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.css']
})
export class ProgressDialogComponent implements OnInit {

  public content: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.content = data.content
   }

 ngAfterViewInit(): void {
   var container = document.getElementById('mat-dialog-1');
   container.setAttribute('class', '');
   console.log(container);
 }
  ngOnInit(): void {
  
  }

}

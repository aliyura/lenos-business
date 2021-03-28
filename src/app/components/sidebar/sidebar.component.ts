import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private authService:AuthenticationService,
    private dialogHandler: DialogHandlerService,
    private notification: NotificationService
  ) {}


  get isAuthenticated(){
    return this.authService.isAuthenticated;
  }
  get authenticatedUser(){
    return this.authService.authenticatedUser as User;
  }
  logout(){
    this.authService.logout(); 
  }
  
  addCategory() {
    this.dialogHandler.requestAddCategoryDialog('Add Category', (response) => {
      if (response) {
        this.notification.notifySuccess('Added Successfully');
      } else {
        this.notification.notifyError('Unable to edit the category');
      }
    });
  }

  ngOnInit(): void {}
}

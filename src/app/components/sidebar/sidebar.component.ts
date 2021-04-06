import { AppCluster } from 'src/app/app.shared.cluster';
import { AccountType } from './../../enum/account-type.enum';
import { CounterResponse } from './../../models/counter-response.model';
import { StorageService } from './../../services/storage.service';
import { CounterService } from './../../services/counter.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Store } from 'src/app/enum/store.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  counts: CounterResponse;
  appAccountType = AccountType;

  constructor(
    private authService: AuthenticationService,
    private dialogHandler: DialogHandlerService,
    private notification: NotificationService,
    private storage: StorageService
  ) {}

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    return this.authService.authenticatedUser as User;
  }
  logout() {
    this.authService.logout();
  }

  public loadCounts() {
    try {
      var counts = this.storage.getSession(Store.COUNTS);
      if (counts != null) {
        this.counts = JSON.parse(counts) as CounterResponse;
      } else {
        this.storage.recheck(() => {
          this.loadCounts();
        }, 100);
      }
    } catch (ex) {
      console.log(ex);
      console.log('Unable to convert counts to JSON');
    }
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

  ngOnInit(): void {
      this.loadCounts();
  }
}

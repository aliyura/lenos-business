import { AppCluster } from './../../app.shared.cluster';
import { Component, OnInit } from '@angular/core';
import { CategoryType } from 'src/app/enum/category-type.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Store } from 'src/app/enum/store.enum';
import { ApiResponse } from 'src/app/models/api-response.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { List } from 'src/app/types/list.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  categories: any;

  constructor(
    private app: AppCluster,
    private storage: StorageService,
    private authService: AuthenticationService
  ) {}
  public loadCategories() {
    try {
      var categories = this.storage.getSession(Store.CATEGORY);
      if (categories != null) {
        this.categories = JSON.parse(categories);
      } else {
        this.storage.recheck(() => {
          this.loadCategories();
        }, 100);
      }
    } catch (ex) {
      console.log(ex);
      console.log('Unable to convert categories to JSON');
    }
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    return this.authService.authenticatedUser as User;
  }
  logout() {
    this.authService.logout();
  }
  toggleDrawer() {
    var display = document.getElementById('sidebar').style.display;
    if (display.toLowerCase() == 'block') {
      document.getElementById('sidebar').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
      this.app.enableScrolling();
    } else {
      document.getElementById('sidebar').style.display = 'block';
      document.getElementById('overlay').style.display = 'block';
      this.app.disableScrolling();
    }
     if (window.innerWidth < 800)
       document.getElementById('page-wrapper').style.marginLeft = '0';
     else
       document.getElementById('page-wrapper').style.marginLeft = '300px';
  }
  ngOnInit(): void {
    this.loadCategories();
  }
  ngAfterViewInit() {
    if (window.innerWidth < 800) {
      document.getElementById('sidebar').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
      this.app.enableScrolling();
    }
  }
}

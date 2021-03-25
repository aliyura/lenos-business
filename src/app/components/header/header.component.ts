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

  constructor(private storage: StorageService,
    private authService:AuthenticationService) {}
  public loadCategories() {
    try {
      var categories = this.storage.getSession(Store.CATEGORY);
      if (categories != null) {
        this.categories = JSON.parse(categories);
      } else {
        this.storage.recheck(()=>{
          this.loadCategories();
        },100);
      }
    } catch (ex) {
      console.log(ex);
      console.log('Unable to convert categories to JSON');
    }
  }

  get isAuthenticated(){
    return this.authService.isAuthenticated;
  }
  get authenticatedUser(){
    return this.authService.authenticatedUser as User;
  }
  logout(){
    this.authService.logout(); 
  }

  ngOnInit(): void {
    this.loadCategories();
  }
}

import { Component, OnInit } from '@angular/core';
import { AccountType } from 'src/app/enum/account-type.enum';
import { ApiResponse } from 'src/app/models/api-response.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { List } from 'src/app/types/list.type';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {

  users: List<User>;
  constructor(private authService: AuthenticationService) {}

  private getBuyers(page: number) {
    this.authService.getUsersByAccountType(page, AccountType.BUSINESS).subscribe(
        (response: ApiResponse) => {
          if (response.success) this.users = response.payload;
          console.log(this.users);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  activate(e,user:User){
    console.log(e);
  }

  ngOnInit(): void {
    this.getBuyers(0);
  }
}

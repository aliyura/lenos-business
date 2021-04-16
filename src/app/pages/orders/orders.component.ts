import { AccountType } from './../../enum/account-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Status } from 'src/app/enum/status.enum';
import { OrderService } from './../../services/order.service';
import { Order } from './../../models/order.model';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/types/list.type';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: List<Order>;
  currentPage: number = 0;
  totalPages: number = 0;
  appAccountType = AccountType;
  statusActions: Array<string> = ['IA', 'PV', 'PC', 'DP', 'PP', 'DV'];
  isLoading: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private dialogHandler: DialogHandlerService,
    private orderService: OrderService
  ) {}

  private getOrders(page: number) {
    this.isLoading = true;
    this.currentPage = page;
    this.orderService.getOrders(page).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.success) {
          this.orders = response.payload['content'];
          this.totalPages = response.payload['totalPages'];
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
  private getOrdersBySeller(selerId: number) {
    this.isLoading = true;
    this.orderService.getOrdersBySellerId(selerId).subscribe(
      (response: ApiResponse) => {
         this.isLoading = false;
        if (response.success) {
          this.orders = response.payload;
        }
      },
      (err) => {
         this.isLoading = false;
        console.log(err);
      }
    );
  }

  deleteOrder(order: Order) {
    this.dialogHandler.requestConfirmation(
      'Delete User',
      'Are you sure you want to delete this order?',
      (yes) => {
        if (yes) {
          this.orderService.deleteOrderById(order.id).subscribe(
            (response: ApiResponse) => {
              if (response.success) this.getOrders(this.currentPage);
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }

  changeOrderStatus(e, order: Order) {
    var status = e.target.value;
    this.orderService.updateOrderStatus(status, order.id).subscribe(
      (response: ApiResponse) => {
        if (!response.success) this.getOrders(this.currentPage);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changePage(self, page) {
    self.currentPage = page;
    self.getOrders(self.currentPage);
  }
  nextPage(self) {
    if (self.currentPage < self.totalPages) {
      self.currentPage = self.currentPage + 1;
      self.getOrders(self.currentPage);
    }
  }
  previousPage(self) {
    if (self.currentPage > 0) {
      self.currentPage = self.currentPage - 1;
      self.getOrders(self.currentPage);
    }
  }
  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    return this.authService.authenticatedUser as User;
  }

  ngOnInit(): void {
    if (this.authenticatedUser.accountType == AccountType.ADMIN) {
      this.getOrders(0);
      console.log('no');
    } else {
      console.log('yes');
      this.getOrdersBySeller(this.authenticatedUser.id);
    }
  }
}

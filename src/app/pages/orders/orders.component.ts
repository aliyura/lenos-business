import { Status } from 'src/app/enum/status.enum';
import { OrderService } from './../../services/order.service';
import { Order } from './../../models/order.model';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/types/list.type';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: List<Order>;
  currentPage: number = 0;
  totalPages: number = 0;
  statusActions: Array<string> = ['IA', 'PV', 'PC', 'DP', 'PP', 'DV'];

  constructor(
    private dialogHandler: DialogHandlerService,
    private orderService: OrderService
  ) {}

  private getOrders(page: number) {
    this.currentPage = page;
    this.orderService.getOrders(page).subscribe(
      (response: ApiResponse) => {
        if (response.success) {
          this.orders = response.payload['content'];
          this.totalPages = response.payload['totalPages'];
        }
      },
      (err) => {
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

  ngOnInit(): void {
    this.getOrders(0);
  }
}

import { AccountType } from './../../enum/account-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/enum/status.enum';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { ProductService } from 'src/app/services/product.service';
import { List } from 'src/app/types/list.type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: List<Product>;
  currentPage: number = 0;
  totalPages: number = 0;
  appAccountType = AccountType;
  isLoading:boolean =true

  constructor(
    private authService: AuthenticationService,
    private dialogHandler: DialogHandlerService,
    private productService: ProductService
  ) {}

  private getProducts(page: number) {
    this.isLoading=true
    this.productService.getAllProducts(page).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.success) {
          this.products = response.payload['content'];
          this.totalPages = response.payload['totalPages'];
        }
      },
      (err) => {
         this.isLoading = false;
        console.log(err);
      }
    );
  }
  private getProductsBySeller(sellerId: number, page: number) {
     this.isLoading = true;
    this.productService.getAllProductsBySeller(sellerId, page).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;
        if (response.success) {
          this.products = response.payload['content'];
          this.totalPages = response.payload['totalPages'];
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  error(e) {
    e.target.src = '/assets/images/notfound.png';
  }

  activate(e, product) {
    var status = Status.AC;
    if (e.target.checked) status = Status.AC;
    else status = Status.IA;

    this.productService.updateProductStatus(status, product.id).subscribe(
      (response: ApiResponse) => {
        if (!response.success) e.target.checked = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteProduct(product) {
    this.dialogHandler.requestConfirmation(
      'Delete Product',
      'Are you sure you want to delete product ' + product.name + '?',
      (yes) => {
        if (yes) {
          this.productService.deleteProductById(product.id).subscribe(
            (response: ApiResponse) => {
              if (response.success) {
                if (this.authenticatedUser.accountType == AccountType.ADMIN)
                  this.getProducts(this.currentPage);
                else
                  this.getProductsBySeller(
                    this.authenticatedUser.id,
                    this.currentPage
                  );
              }
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }

  changePage(self, page) {
    self.currentPage = page;
    if (self.authenticatedUser.accountType == AccountType.ADMIN)
      self.getProducts(self.currentPage);
    else self.getProductsBySeller(self.authenticatedUser.id, self.currentPage);
  }
  nextPage(self) {
    if (self.currentPage < self.totalPages) {
      self.currentPage = self.currentPage + 1;
      if (self.authenticatedUser.accountType == AccountType.ADMIN)
        self.getProducts(self.currentPage);
      else
        self.getProductsBySeller(self.authenticatedUser.id, self.currentPage);
    }
  }
  previousPage(self) {
    if (self.currentPage > 0) {
      self.currentPage = self.currentPage - 1;
      if (self.authenticatedUser.accountType == AccountType.ADMIN)
        self.getProducts(self.currentPage);
      else
        self.getProductsBySeller(self.authenticatedUser.id, self.currentPage);
    }
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  get authenticatedUser() {
    return this.authService.authenticatedUser as User;
  }

  ngOnInit(): void {
    if (this.authenticatedUser.accountType == AccountType.ADMIN)
      this.getProducts(0);
    else this.getProductsBySeller(this.authenticatedUser.id, 0);
  }
}

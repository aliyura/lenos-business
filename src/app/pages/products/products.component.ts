import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/enum/status.enum';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Product } from 'src/app/models/product.model';
import { DialogHandlerService } from 'src/app/services/dialog-handler.service';
import { ProductService } from 'src/app/services/product.service';
import { List } from 'src/app/types/list.type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: List<Product>;
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(
    private dialogHandler:DialogHandlerService,
    private productService: ProductService
  ) {}

  private getProducts(page:number) {
    this.productService.getAllProducts(page).subscribe(
      (response: ApiResponse) => {
        if (response.success) {
          this.products = response.payload['content'];
          this.totalPages = response.payload['totalPages'];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  error(e){
    e.target.src='/assets/images/notfound.png'
  }

  activate(e,product){
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

  deleteProduct(product){
    this.dialogHandler.requestConfirmation(
      'Delete Product',
      'Are you sure you want to delete product ' + product.name + '?',
      (yes) => {
        if (yes) {
          this.productService.deleteProductById(product.id).subscribe(
            (response: ApiResponse) => {
              if (response.success) this.getProducts(this.currentPage);
            },
            (err) => console.log(err)
          );
        }
      }
    );
  }

  changePage(self, page) {
    self.currentPage = page;
    self.getProducts(self.currentPage);
  }
  nextPage(self) {
    if (self.currentPage <self.totalPages) {
      self.currentPage = self.currentPage + 1;
      self.getProducts(self.currentPage);
    }
  }
  previousPage(self) {
    if (self.currentPage > 0) {
      self.currentPage = self.currentPage - 1;
      self.getProducts(self.currentPage);
    }
  }
  ngOnInit(): void {
    this.getProducts(0);
  }
}

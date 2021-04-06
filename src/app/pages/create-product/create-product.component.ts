import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppCluster } from 'src/app/app.shared.cluster';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { SubCategory } from 'src/app/models/sub-category.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { List } from 'src/app/types/list.type';
import { FormValidator } from 'src/app/validators/form-custom.validator';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  categories: List<Category>;
  subCategories: List<SubCategory>;
  form: FormValidator;
  product: Product;

  constructor(
    private app: AppCluster,
    private router: Router,
    private productService:ProductService,
    private categoryService: CategoryService,
    private notification: NotificationService
  ) {
    this.form = new FormValidator(Product, 'form');
  }


  public uploadProduct() {
    this.form.revalidate();
    let response = this.form.response;
    this.product = this.form.data;
    delete this.product['null'];

     console.log(this.product);
    if (
      response['name'].ok &&
      response['categoryId'].ok &&
      response['subCategoryId'].ok &&
      response['deliveryDays'].ok &&
      response['paymentOption'].ok &&
      response['price'].ok
    ) {
      if (!parseInt(this.product.price.toString())) {
        this.notification.notifyWarning('Only numbers allowed for Price input');
      } else if (this.product.thumbnail == null) {
        this.notification.notifyWarning('Product thumbnail required');
      } else if (this.product.images == null) {
        this.notification.notifyWarning('Product images required');
      } else {
        this.productService.uploadProduct(this.product).subscribe(
          (response: ApiResponse) => {
            if (response.success) {
              this.notification.notifySuccess('Uploaded Successfully');
              this.notification.showSuccess("Uploaded Successfully", "product.add", "Upload Another");
            }
            else
               this.notification.notifyError(response.message);
          },
          (err) => {
            this.notification.notifyError('Unable to upload the Product');
          }
        );
      }
    }
  }
  
  public onCategorySelected(e) {
    this.getSubCategoriesByCategoryId(e.target.value);
  }
  public getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (response: ApiResponse) => {
        console.log(response.payload);
        if (response.success) this.categories = response.payload;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public getSubCategoriesByCategoryId(id) {
    this.categoryService.getSubCategoriesByCategoryId(id).subscribe(
      (response: ApiResponse) => {
        if (response.success) this.subCategories = response.payload;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.getAllCategories();
  }
}

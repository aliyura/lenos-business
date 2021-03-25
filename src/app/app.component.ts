import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AppCluster } from './app.shared.cluster';
import { CategoryType } from './enum/category-type.enum';
import { Store } from './enum/store.enum';
import { ApiResponse } from './models/api-response.model';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Lenos Nigeria';

  constructor(
    private app: AppCluster,
    private storage: StorageService,
    private productService:ProductService,
    private categoryService: CategoryService
  ) {}

  async getProductCategories() {
     this.categoryService.getCategoriesByType(CategoryType.PRODUCT).subscribe(
      (response: ApiResponse) => {
        if (response.success) {
          if (response.payload != null)
            this.storage.saveSession(
              Store.CATEGORY,
              JSON.stringify(response.payload)
            );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.app.loadJsFile('assets/js/main.js');
    var categories = this.storage.getSession(Store.CATEGORY);
    if (categories == null)  this.getProductCategories();

    this.productService.getAllProducts(0).subscribe((response:ApiResponse)=>{
        console.log(response);
    });
  }
}

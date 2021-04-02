import { LocationService } from './services/location.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AppCluster } from './app.shared.cluster';
import { CategoryType } from './enum/category-type.enum';
import { Store } from './enum/store.enum';
import { ApiResponse } from './models/api-response.model';
import { CategoryService } from './services/category.service';
import { CounterService } from './services/counter.service';
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
    private categoryService: CategoryService,
    private counterService: CounterService,
    private locationService: LocationService
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
  async getLocations() {
    this.locationService.getLocations().subscribe(
      (response: ApiResponse) => {
        if (response.success) {
          if (response.payload != null)
            this.storage.saveSession(
              Store.LOCATIONS,
              JSON.stringify(response.payload)
            );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async getCounts() {
    this.counterService.getCounts().subscribe(
      (response: ApiResponse) => {
        if (response.success) {
          if (response.payload != null)
            this.storage.saveSession(
              Store.COUNTS,
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
    this.app.loadJsFile('assets/js/scripts.js');

    //get product categories
    var categories = this.storage.getSession(Store.CATEGORY);
    if (categories == null) this.getProductCategories();

    //get all locations
    var locations = this.storage.getSession(Store.LOCATIONS);
    if (locations == null) this.getLocations();

    //get all counts
    var counts = this.storage.getSession(Store.COUNTS);
    if (counts == null) this.getCounts();
  }
}

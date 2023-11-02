import { Component, OnInit, Input } from '@angular/core';
import { ProductService, Product, Filters, CategoryService, Category } from '../../core'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements OnInit {

  // routeFilters: string | null;
  routeFilters: string | null;
  listProducts: Product[] = [];
  listCategories: Category[] = [];
  slug_Category: string | null = null;
  filters = new Filters();
  totalPages: Array<number> = [];
  offset: number = 0;
  limit: number = 3;

  currentPage: number = 1;
  query!: Filters;

  @Input() set config(filters: Filters) {
    if (filters) {
      this.query = filters;
      this.currentPage = 1;
      this.get_list_filtered(this.query);
    }
  }

  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute,
    private Location: Location
    
    ) { 
      this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    }

  ngOnInit(): void {
  this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
  this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
  
  this.getListForCategory();

    if(this.slug_Category !== null) {
      this.get_products();
    }
    else if(this.routeFilters !== null){
      this.refresRouteFilter();
      this.get_list_filtered(this.filters);
    }else{
      // this.get_all_products();
      this.get_list_filtered(this.filters);
    }


  }



  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  get_products(): void {

    const params = this.getRequestParams(this.offset, this.limit);
    console.log(params);
    if (this.slug_Category !== null) {
      this.ProductService.get_products_from_category(this.slug_Category, params).subscribe({
        next: data => {
          if (this.slug_Category) {
            this.filters.category = this.slug_Category;
          }
          this.listProducts = data.products;
          // console.log(this.listProducts);
          this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
        },
        error: e => console.error(e)
      });
    }
  }

  get_all_products() {

    this.ProductService.all_products().subscribe(
      (data: any) => {
        this.listProducts = data.products;
        // console.log(this.listProducts);

      });
  }

  get_list_filtered(filters: Filters) {
    this.filters = filters;

    console.log(this.filters);
    
    this.ProductService.get_products(filters).subscribe({
      next: data => {
        this.listProducts = data.products;
        console.log(this.listProducts);
        this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
      },
        error: e => console.error(e)
  });

  }


  getListForCategory() {
    this.CategoryService.all_categories().subscribe(
      (data:any) => {
        this.listCategories = data.categories;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refresRouteFilter() {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    if(typeof(this.routeFilters) == "string" ){
      this.filters = JSON.parse(atob(this.routeFilters));
    }else{
      this.filters = new Filters();
    }
  }

  setPageTo(pageNumber: number) {

    this.currentPage = pageNumber;

    if (typeof this.routeFilters === 'string') {
      this.refresRouteFilter();
    }

    if (this.limit) {
      this.filters.limit = this.limit;
      this.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
    this.get_list_filtered(this.filters);
  }

}
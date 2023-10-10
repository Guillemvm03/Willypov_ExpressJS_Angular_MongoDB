
import { Component, OnInit, Input } from '@angular/core';
import { ProductService, Product, Filters, CategoryService, Category } from '../../core'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements OnInit {

  listProducts: Product[] = [];
  slug_Category: string | null = null;
  filters = new Filters();
  totalPages: Array<number> = [];
  offset: number = 0;
  limit: number = 3;

  constructor(
    private ProductService: ProductService,
    // private CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute
    
    ) { }

  ngOnInit(): void {
  this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
  

  if(this.slug_Category !== null) {
    this.get_products();
  }else{
    this.get_all_products();
  }
  }

  get_products(): void {

    const params = null;
    if (this.slug_Category !== null) {
      this.ProductService.get_products_from_category(this.slug_Category, params).subscribe({
        next: data => {
          this.listProducts = data.products;
          console.log(this.listProducts);
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
    this.ProductService.get_products(filters).subscribe({
      next: data => {
        this.listProducts = data.products;
        console.log(this.listProducts);
        this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
      },
        error: e => console.error(e)
  });
  }


}
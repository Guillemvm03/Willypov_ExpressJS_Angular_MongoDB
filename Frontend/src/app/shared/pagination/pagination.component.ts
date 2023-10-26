import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Filters, Category, Product, ProductService, CategoryService } from '../../core/';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})


export class PaginationComponent implements OnInit {
  @Output() filterEvent: EventEmitter<Filters> = new EventEmitter();
  @Input() totalPages: Array<number> = [];
  @Input() listProducts: Product[] = [];
 

routeFilters: string | any;
slug_Category: string | null = null;


filters = new Filters();
offset: number = 0;
limit: number = 3;
currentPage: number = 1;

  


  constructor(
    private Location: Location,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.routeFilters = this.activatedRoute.snapshot.paramMap.get('filters');
    // if(this.routeFilters != null) {
    //   this.filters = JSON.parse(atob(this.routeFilters));
    //   if(this.filters.offset) {
    //     this.offset = this.filters.offset
    //     this.currentPage = (this.offset / 3) + 1
    //   }
    // }
    console.log(this.listProducts);
    console.log(this.totalPages);
  }




  // setPageTo(pageNumber: number) {

  //   this.currentPage = pageNumber;

  //   if (typeof this.routeFilters === 'string') {
  //     // this.refresRouteFilter();
  //   }

  //   if (this.limit) {
  //     this.filters.limit = this.limit;
  //     this.filters.offset = this.limit * (this.currentPage - 1);
  //   }

  //   this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
  //   // this.get_list_filtered(this.filters);
  // }

  // private checkTime(filter: Filters) {
  //   setTimeout(() => {
  //     if(filter === this.filters) {
  //       this.filterEvent.emit(this.filters);
  //       this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
  //     }
  //   },200);
  // }

}



import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../core'

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})

export class CategoriesListComponent implements OnInit {

  categories: Category[] = []; 
    // categories!: Category[]
  offset = 0;

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    
    this.retrieveCategories();
    
  }

  getRequestParams(offset: number, limit: number) {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  retrieveCategories() {
    const params = this.getRequestParams(this.offset, 3)
    this.CategoryService.all_categories().subscribe({
      next: (data:any) => {
              this.categories = data.categories;
              this.offset = this.offset + 3;
              // console.log(this.categories);
            }
          });
  }


  scroll() {
    this.retrieveCategories();
  }
  
    
}




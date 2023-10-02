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

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    
    this.retrieveCategories();
    
  }


  retrieveCategories() {
    this.CategoryService.all_categories().subscribe({
      next: (data:any) => {
              this.categories = data.categories
              // console.log(this.categories);
            }
          });
  }
  
    
}




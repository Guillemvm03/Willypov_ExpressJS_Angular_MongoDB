import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
// import { NgxMultiselectModule } from '@ngx-lib/multiselect';

import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { ProductsListComponent } from './products-list/products-list.component';
import { CardProductComponent } from './card-product/card-product.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CarouselComponent } from './carousel/carousel.component';
// import { CarouselItemsComponent } from './carousel-items/carousel-items.component';

// import { FiltersComponent } from './filters/filters.component';
// import { CommentsComponent } from './comments/comments.component';
// import { SearchComponent } from './search/search.component';
// import { ShowAuthedDirective } from './show-authed.directive';
// import { ProfileProductsComponent } from './profile-products/profile-products.component';
// import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';

// import { FollowButtonComponent, FavoriteButtonComponent } from './buttons';
// import { CardCategoriesComponent } from './card-categories/card-categories.component';
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        InfiniteScrollModule,
        MdbCarouselModule
    ],
    declarations: [
        CategoriesListComponent,
        ProductsListComponent,
        CardProductComponent,
        CarouselComponent
        
        // CarouselItemsComponent
        // CardCategoriesComponent

        // ProductDetailsComponent,
        // ShowAuthedDirective,
        // FiltersComponent,
        // CommentsComponent,
        // SearchComponent,
        // ProfileProductsComponent,
        // ProfileFavoritesComponent,
        // CardProductComponent,
        // FollowButtonComponent,
        // FavoriteButtonComponent
    ],
    exports: [
        CategoriesListComponent,
        ProductsListComponent,
        CardProductComponent,
        CarouselComponent
        
        // CarouselItemsComponent
        // CardCategoriesComponent
        // ProductDetailsComponent,
        // FormsModule,
        // ReactiveFormsModule,
        // ShowAuthedDirective,
        // FiltersComponent,
        // CommentsComponent,
        // SearchComponent,
        // ProfileProductsComponent,
        // ProfileFavoritesComponent,
        // CardProductComponent,
        // FollowButtonComponent,
        // FavoriteButtonComponent
    ],
})

export class SharedModule { }
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxMultiselectModule } from '@ngx-lib/multiselect';

import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { ProductsListComponent } from './products-list/products-list.component';
import { CardProductComponent } from './card-product/card-product.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './filters/filters.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { FavoriteButtonComponent } from './buttons';
import { FollowButtonComponent } from './buttons';
import { CommentsComponent } from './comments/comments.component';
import { ShowAuthedDirective } from './show-authed.directive';

// import { ProfileProductsComponent } from './profile-products/profile-products.component';
// import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        InfiniteScrollModule,
        MdbCarouselModule,
        FormsModule,
        ReactiveFormsModule,
        
    ],
    declarations: [
        CategoriesListComponent,
        ProductsListComponent,
        CardProductComponent,
        CarouselComponent,
        FiltersComponent,
        SearchComponent,
        PaginationComponent,
        ListErrorsComponent,
        FavoriteButtonComponent,
        FollowButtonComponent,
        CommentsComponent,
        ShowAuthedDirective

        // ShowAuthedDirective,
        // CommentsComponent,
        // SearchComponent,
        // ProfileProductsComponent,
        // ProfileFavoritesComponent,

    ],
    exports: [
        CategoriesListComponent,
        ProductsListComponent,
        CardProductComponent,
        CarouselComponent,
        FiltersComponent,
        SearchComponent,
        PaginationComponent,
        FormsModule,
        ReactiveFormsModule,
        ListErrorsComponent,
        FavoriteButtonComponent,
        FollowButtonComponent,
        CommentsComponent,
        ShowAuthedDirective
        
        // ShowAuthedDirective,
        // CommentsComponent,
        // ProfileProductsComponent,
        // ProfileFavoritesComponent,
        // CardProductComponent,
        // FollowButtonComponent,
        // FavoriteButtonComponent
    ],
})

export class SharedModule { }
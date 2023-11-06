import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../core'


@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.css']
})
export class ProfileFavoritesComponent implements OnInit {

  listProducts: Product[] = [];
  images!: String;

  constructor(
    private ProductService: ProductService
  ) { }
  
  ngOnInit(): void {

    // if(typeof this.listProducts !== "undefined"){
    //   this.images = this.product.product_images[0];
    // }
    this.getFavoriteProducts();
  }


  getFavoriteProducts() {
    this.ProductService.fav_products_user().subscribe({
      next: (data:any) => {
        this.listProducts = data.product;
        console.log(this.listProducts);
      },
      error: error => console.error(error)
    });
  }

}

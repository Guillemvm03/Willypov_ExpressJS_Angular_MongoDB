import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})

export class CardProductComponent implements OnInit {

  @Input() product: Product = {} as Product;
 


  images!: String;

  constructor() { }

  ngOnInit(): void {  
    if(typeof this.product.product_images !== "undefined"){
      this.images = this.product.product_images[0];
    }

    
  }

  onToggleFavorite(favorited: boolean) {
    this.product.liked = favorited;

    if (favorited) {
      this.product.likesCount++;
    } else {
      this.product.likesCount--;
    }
  }


}
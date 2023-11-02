import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.scss']
})
export class RelatedComponent implements OnInit {


  @Input() product: Product = {} as Product;


  images!: String;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {  
    if(typeof this.product.product_images !== "undefined"){
      this.images = this.product.product_images[0];
    }

    
  }
}

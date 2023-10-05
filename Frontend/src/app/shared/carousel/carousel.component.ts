import { Component, Input, OnInit } from '@angular/core';
import { Carousel,CarouselService, Product_images } from '../../core'


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {
  @Input() page : String = "";
  @Input() slug : String = "";

  home : Boolean = false;

  listCarousel: Carousel[] = [];
  product_images: Product_images[] =[];

  constructor(
    private CarouselService: CarouselService
    
    ) { }

  ngOnInit(): void {
    if (this.page === "home"){
      this.home = true;
      this.get_carousel_categories();
    } else if (this.page === "details") {
      this.home = false;
      // console.log('details images');
      this.get_product_images();
    }
   

  }
  
  get_carousel_categories() {

    this.CarouselService.getCarousel().subscribe(
      (data: any) => {
        this.listCarousel = data.categories;
        // console.log(this.listCarousel);

      });
  }

  get_product_images(){
    this.CarouselService.getProduct_images(this.slug).subscribe(
      (data: any) => {
        this.product_images = data.product.product_images;
        console.log(this.product_images);
      }
    )
  }

}
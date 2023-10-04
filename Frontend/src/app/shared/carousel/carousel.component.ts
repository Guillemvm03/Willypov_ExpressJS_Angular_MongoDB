import { Component, Input, OnInit } from '@angular/core';
import { Carousel,CarouselService } from '../../core'


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {

  listCarousel: Carousel[] = [];

  constructor(
    private CarouselService: CarouselService
    
    ) { }

  ngOnInit(): void {
    this.get_carousel();
  }
  
  get_carousel() {

    this.CarouselService.getCarousel().subscribe(
      (data: any) => {
        this.listCarousel = data.carousel;
        console.log(this.listCarousel);

      });
  }

}
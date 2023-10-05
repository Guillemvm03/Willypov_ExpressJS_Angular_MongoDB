import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carousel } from '../models/carousel.model';

const URL = 'http://localhost:8080/api/carousel/categories';
<<<<<<< HEAD
=======
const URL_images = "http://localhost:8080/api/carousel/products"
>>>>>>> 3a5276968a3bc7e55f7ff3e63c1d6b9fb3000225

@Injectable({
  providedIn: 'root',
})

export class CarouselService {

  constructor(private http: HttpClient) { }

  getCarousel(): Observable<Carousel[]> {    
    return this.http.get<Carousel[]>(URL);
  }

  getProduct_images(slug : String): Observable<Carousel[]> {    
    return this.http.get<Carousel[]>(`${URL_images}/${slug}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carousel } from '../models/carousel.model';

const URL = 'http://localhost:8080/api/carousel/categories';

@Injectable({
  providedIn: 'root',
})

export class CarouselService {

  constructor(private http: HttpClient) { }

  getCarousel(): Observable<Carousel[]> {    
    return this.http.get<Carousel[]>(URL);
  }

  getProduct_images(slug : String): Observable<Carousel[]> {    
    return this.http.get<Carousel[]>(`${URL}/${slug}`);
  }
}
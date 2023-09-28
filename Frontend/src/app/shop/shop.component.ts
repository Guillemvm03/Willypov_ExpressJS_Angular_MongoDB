import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { User, UserService, Profile } from '../core';
// import { concatMap ,  tap } from 'rxjs/operators';

console.log("hola shop");
@Component({
    selector: 'app-shop-page',
    templateUrl: './shop.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })

  export class ShopComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
  }
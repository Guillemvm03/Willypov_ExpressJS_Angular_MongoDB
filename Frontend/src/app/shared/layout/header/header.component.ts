import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { User, UserService } from '../../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {


  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  currentUser!: User;
  isAuthenticated!: boolean;

  ngOnInit() {

    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        console.log(this.currentUser);
        this.cd.markForCheck();
        // this.isAuthenticated = true;
      }
    );

    this.userService.isAuthenticated.subscribe(
      (userData:any) => {
        this.isAuthenticated = userData;
        console.log(this.isAuthenticated)



      }
    );
  }

  }

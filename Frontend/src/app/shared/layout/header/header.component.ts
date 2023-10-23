import { Component, OnInit } from '@angular/core';

import { User, UserService } from '../../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  currentUser!: User;

  UserActive: boolean = false;



  constructor(
    private UserService: UserService
  ) {}

  ngOnInit() {

    this.UserService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        this.UserActive = isAuthenticated;
      }
    );

    this.UserService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        console.log(this.currentUser);
      }
    );
  }
  
}
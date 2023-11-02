import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserService, Profile } from '../core';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) { }

  profile!: Profile;
  currentUser!: User;
  isUser!: boolean;

  // profile: Profile = {} as Profile;
  // currentUser: User = {} as User;
  // isUser: boolean = false;



  

  ngOnInit(): void {
    this.route.data.subscribe(
      (data:any) => {
        this.profile = data.profile
        this.userService.currentUser.subscribe(
          data => {
            this.isUser = (data.username === this.profile.username);
          }
        )
      });


  }


  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }

}

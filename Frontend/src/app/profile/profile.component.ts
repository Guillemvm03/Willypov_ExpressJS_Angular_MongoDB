import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService, Profile, ProfilesService } from '../core';
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
    private cd: ChangeDetectorRef,
    private profilesService: ProfilesService,
    private router: Router
  ) { }

  profile!: Profile;
  currentUser!: User;
  isUser!: boolean;

  profiledata!:any;

  // isfollow!:boolean;
  // isfavorite!:boolean;
  // isproducts!:boolean;
  

  ngOnInit(): void {

    // if(this.router.url.split('/')[3] === 'follows'){
    //   // console.log('sadad');
    //   this.isfollow = true;
    //   // location.reload();
    // }
    // else if(this.router.url.split('/')[1] === 'favorite'){
    //   // this.isfavorite = true;
    // }
    // else if(this.router.url.split('/')[1] === 'products'){
    //   // this.isproducts = true;
    // }


    this.route.data.subscribe(
      (data:any) => {
        this.profile = data.profile
        this.userService.currentUser.subscribe(
          data => {
            this.isUser = (data.username === this.profile.username);
            
          }
        )
      });

      this.profilesService.get(this.profile.username).subscribe(
        (profile: Profile) => {
          // console.log(profile);
        }
      )

  }


  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }

}
